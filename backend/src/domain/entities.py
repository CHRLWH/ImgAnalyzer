from dataclasses import dataclass
from typing import Optional

@dataclass
class Image:
    id: Optional[int]
    image: str
    name: str
    value: int
    description: str
    date: str
    latitude: Optional[float]
    longitude: Optional[float]
