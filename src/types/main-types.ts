export interface gameScores {
    cherry: number,
    lemon: number,
    orange: number,
    watermelon: number
}

export interface itemsPosition {
    cherry: number,
    lemon: number,
    orange: number,
    watermelon: number
}

export interface imageSourceItem {
    name: string,
    value: number,
    url: string
}

export type imagesSource = Array<imageSourceItem>;