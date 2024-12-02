import { Rewards, Users, Votes } from "./../../database/schema";
import { NextFunction, Request, Response } from "express";
import NodeError from "../../utils/NodeError";
import {
  APIStatusCode,
  CommentType,
  ErrorCode,
  ErrorMessage,
  ResponseStatus,
  Score,
  SuccesMessage,
  VoteValue,
} from "../../utils/enums";
import { database } from "../../database/connection";
import { eq, sql } from "drizzle-orm";

const addVote = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const { vote, answerId, questionId } = req.body;
  const voteType =
    questionId && answerId
      ? ""
      : questionId
        ? CommentType.QUESTION
        : answerId
          ? CommentType.ANSWER
          : "";
  try {
    if (!userId || !voteType) {
      throw new NodeError(
        ErrorMessage.ADD_VOTE,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_DATA
      );
    }

    const user = await database.query.Users.findFirst({
      where: (Users, { inArray }) => inArray(Users.userId, [userId]),
    });
    console.log(user, "from Add vote ......................");
    if (!user) {
      throw new NodeError(
        ErrorMessage.ACTIVITIES_USER,
        APIStatusCode.NOT_FOUND,
        ErrorCode.INVALID_DATA
      );
    }

    let result;

    const userVote = await database.query.Votes.findFirst({
      where:
        voteType === CommentType.QUESTION
          ? (Votes, { and, eq }) =>
              and(
                eq(Votes.type, CommentType.QUESTION),
                eq(Votes.questionId, questionId)
              )
          : (Votes, { and, eq }) =>
              and(
                eq(Votes.type, CommentType.ANSWER),
                eq(Votes.answerId, answerId)
              ),
    });

    if (userVote) {
      result = await database
        .update(Votes)
        .set({
          vote: vote ? VoteValue.POSITIVE : VoteValue.NEGATIVE,
        })
        .where(eq(Votes.voteId, userVote.voteId))
        .returning({
          voteId: Votes.voteId,
          vote: Votes.vote,
          userId: Votes.userId,
        });
    } else {
      result = await database
        .insert(Votes)
        .values({
          type: voteType,
          userId,
          answerId: voteType === CommentType.ANSWER ? answerId : null,
          questionId: voteType === CommentType.QUESTION ? questionId : null,
          vote: vote ? VoteValue.POSITIVE : VoteValue.NEGATIVE,
        })
        .returning({
          voteId: Votes.voteId,
          vote: Votes.vote,
          userId: Votes.userId,
        });
    }
    if (!result || !result.length) {
      throw new NodeError(
        ErrorMessage.SOMETHING_WENT_WRONG,
        APIStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.SERVER_ERROR
      );
    }

    if (result && result.length && result[0].vote && result[0].vote >= 100) {
      await database
        .update(Rewards)
        .set({
          score: sql`${Rewards.score} + ${Score.LIKES}`,
        })
        .where(eq(Rewards.userId, result[0].userId));
    }
    if (result && result.length && result[0].vote && result[0].vote >= 500) {
      await database
        .update(Rewards)
        .set({
          score: sql`${Rewards.score} + ${Score.LIKES}`,
        })
        .where(eq(Rewards.userId, result[0].userId));
    }
    if (result && result.length && result[0].vote && result[0].vote >= 500) {
      await database
        .update(Rewards)
        .set({
          score: sql`${Rewards.score} + ${Score.LIKES}`,
        })
        .where(eq(Rewards.userId, result[0].userId));
    }
    console.log(result[0].voteId, "voteId........................");
    res.json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.ADD_VOTE,
      data: { voteId: result[0].voteId },
    });
  } catch (error) {
    next(error);
  }
};

export default addVote;
