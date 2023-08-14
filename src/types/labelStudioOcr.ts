export interface OCRResult {
    original_width: number;
    original_height: number;
    image_rotation: number;
    value: {
        x: number;
        y: number;
        width: number;
        height: number;
        rotation: number;
        text?: string[];
    };
    id: string;
    from_name: string;
    to_name: string;
    type: string;
}

export interface Annotation {
    id: number;
    result: OCRResult[];
}

export interface Data {
    image: string;
    ipfs: string;
    submitted_on: string;
}

export interface LabelStudioData {
    id: string;
    annotations: Annotation[];
    data: Data;
}
