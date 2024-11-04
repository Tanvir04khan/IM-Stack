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

export enum QueryKeys {
  GET_USER = "getUser",
  GET_ACTIVITIES = "getActivities",
  GET_PROJECT_DOCS = "getProjectDocs",
  GET_QUESTIONS = "getQuestions",
  GET_PROJECT_DOC_DETAILS = "getProjectDocDetails",
}

export enum Paths {
  GET_ACTIVITIES = "/get-activities",
  GET_USER = "/get-user",
  GET_PROJECT_DOCS = "/get-projectdocs",
  GET_PROJECT_DOC_DETAILS = "/get-projectdocdetails",
  GET_QUESTIONS = "/get-questions",
}
