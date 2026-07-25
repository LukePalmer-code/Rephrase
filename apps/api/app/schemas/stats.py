from pydantic import BaseModel


class StatsRead(BaseModel):
    """Honest stats only — every field here is directly derivable from data
    we actually store today. (No hours-learned/day-streak/hours-listened:
    those would need new time-tracking events we don't collect yet.)
    """

    island_count: int
    sentence_count: int
    review_count: int
    # Fraction of *judged* reviews that were exact/close. None until the
    # Phase 3 agent has judged at least one review.
    recall_accuracy: float | None
