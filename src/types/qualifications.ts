export interface Qualification {
    id: number;
    name: string;
    description: string;
    image: string;
    type: QualificationType;
}

enum QualificationType {
    INCLUSIVE = 0,
    EXCLUSIVE = 1
}