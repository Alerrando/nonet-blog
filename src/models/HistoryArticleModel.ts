export interface HistoryArticleModel {
  id: string;
  parentId?: string | null;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
}
