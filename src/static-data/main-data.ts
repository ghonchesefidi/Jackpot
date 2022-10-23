import type {gameScores, imagesSource, itemsPosition} from "@/types/main-types";

export const imageSourceData: imagesSource = [
    {
        name: 'cherry',
        value: 1,
        url: '/images/cherry.png'
    },
    {
        name: 'lemon',
        value: 2,
        url: '/images/lemon.png'
    },
    {
        name: 'orange',
        value: 3,
        url: '/images/orange.png'
    },
    {
        name: 'watermelon',
        value: 4,
        url: '/images/watermelon.png'
    }
]
export const itemsPositionData: itemsPosition = {
    cherry: 0,
    lemon: -66,
    orange: -136,
    watermelon: -206,
}
export const gameScoresData: gameScores = {
    cherry: 10,
    lemon: 20,
    orange: 30,
    watermelon: 40,
}
export const sampleItems: string[] = ['cherry', 'lemon', 'orange', 'watermelon']
