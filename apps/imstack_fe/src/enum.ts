export enum TotalActivities {
  TOTALPROJECTS = "Total Projects",
  TOTALQUESTIONS = "Total Questions",
  TOTALANSWERS = "Total Answers",
  TOTALVOTES = "Total Votes",
}

export enum ProductsColumn {
  NAME = "name",
  CREATEDBY = "createdBy",
  CREATEDON = "createdOn",
  UPDATEDBY = "updatedBy",
  UPDATEDON = "updatedOn",
}

export enum QuestionsColumn {
  TITLE = "title",
  ASKEDBY = "askedBy",
  ASKEDON = "askedOn",
  ACTIVITY = "activity",
}

export enum UsersColumn {
  USERNAME = "userName",
  EMAIL = "email",
  JOINEDON = "joinedOn",
}

export enum VoteType {
  QUESTION = "question",
  ANSWER = "answer",
}

export enum QueryKeys {
  GET_USER = "getUser",
  GET_USERS = "getUsers",
  GET_ACTIVITIES = "getActivities",
  GET_PROJECT_DOCS = "getProjectDocs",
  GET_QUESTIONS = "getQuestions",
  GET_PROJECT_DOC_DETAILS = "getProjectDocDetails",
  GET_QUESTION_DETAILS = "getQuestionDetails",
  GET_TECHNOLOGIES = "getTechnologies",
  CREATE_PROJECT_DOC = "createProjectDoc",
  UPDATE_PROJECT_DOC = "updateProjectDoc",
  GET_PROJECT_TAGS = "getProjectTags",
  ADD_QUESTION = "addQuestion",
  UPDATE_QUESTION = "updateQuestion",
  UPDATE_VIEWS = "updateViews",
  POST_ANSWER = "postAnswer",
  ADD_VOTE = "addVote",
  UPDATE_ANSWER = "updateAnswer",
  ACCEP_AS_BEST_ANSWER = "acceptAsBestAnswer",
  POST_COMMENT = "postComment",
  ADD_USER = "addUser",
}

export enum Paths {
  GET_ACTIVITIES = "/get-activities",
  GET_USER = "/get-user",
  GET_USERS = "/get-users",
  GET_PROJECT_DOCS = "/get-projectdocs",
  GET_PROJECT_DOC_DETAILS = "/get-projectdocdetails",
  GET_QUESTIONS = "/get-questions",
  GET_QUESTION_DETAILS = "/get-questiondetails",
  GET_TECHNOLOGIES = "/get-technologies",
  CREATE_PROJECT_DOC = "/create-projectdoc",
  UPDATE_PROJECT_DOC = "/update-projectdoc",
  GET_PROJECT_TAGS = "/get-projecttags",
  ADD_QUESTION = "/add-question",
  UPDATE_QUESTION = "/update-question",
  UPDATE_VIEWS = "/update-views",
  POST_ANSWER = "/add-answer",
  ADD_VOTE = "/add-vote",
  UPDATE_ANSWER = "/update-answer",
  ACCEP_AS_BEST_ANSWER = "/acceptasbest-answer",
  POST_COMMENT = "/add-comment",
  ADD_USER = "/add-user",
}
