export interface ReviewState {
  interval: number;
  easeFactor: number;
  reviews: number;
}

export interface NextReview extends ReviewState {
  dueAt: Date;
}
