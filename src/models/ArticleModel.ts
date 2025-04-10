import { HistoryArticleModel } from "./HistoryArticleModel";
import { StatisticsModel } from "./StatisticsModel";

export interface ArticleModel {
  id: string;
  title: string;
  summary: string;
  image: string;
  html: string;
  lastUpdate: Date;
  history?: HistoryArticleModel[];
  statistics: StatisticsModel;
}
