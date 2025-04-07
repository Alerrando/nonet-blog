import { HistoryArticleModel } from "./HistoryArticleModel";

export interface ArticleModel {
  id: string;
  title: string;
  summary: string;
  image: string;
  html: string;
  lastUpdate: Date;
  history?: HistoryArticleModel[];
}
