<template>
  <div class="main-section">
    <div v-for="(item,index) in 3" class="rows" :key="item" :class="'row-' + index">
      <div class="row-item" :ref='el => { divs[index] = el }'>
        <img v-for="item in imagesSourceData" :src="item.url" :alt="item.name" :key="item.name">
      </div>
    </div>
    <div class="start-button" @click="startTheGame">
      <p>
        <span v-if="!locked">Start</span>
        <span v-else>...</span>
      </p>
    </div>
    <div class="result-section">
      <div class="current-credit"><p>Credit: {{ userCredit }}</p></div>
      <div class="wallet-credit"><p>Wallet credit: {{ userWalletCredit }}</p></div>
    </div>
    <div class="cash-out">
      <button @click="cashOut" ref="buttonCashOut" @mouseover="cheatCashOut">CASH OUT</button>
    </div>
  </div>
</template>
<script setup lang=ts>
import {reactive, ref} from "vue";
import type {gameScores, imagesSource, itemsPosition} from '@/types/main-types'
import {imageSourceData, itemsPositionData, gameScoresData, sampleItems} from "@/static-data/main-data";
import {percentageChance} from "@/utils/get-random-item-by-chance";

const userWalletCredit = ref(0)
const userCredit = ref(10)
const locked = ref(false)
const audio = reactive({
  action: new Audio('/audio/action.mp3'),
  spin: new Audio('/audio/spin.mp3'),
  spinEnd: new Audio('/audio/spin-end.mp3'),
})
const divs = ref<HTMLDivElement[]>([]);
const buttonCashOut = ref<HTMLDivElement>();
const imagesSourceData = reactive<imagesSource>(imageSourceData)
const startTheGame = () => {
  if (locked.value === true || userCredit.value === 0) return
  for (let i = 0; i < 3; i++) {
    divs.value[i].style.top = 0 + 'px'
  }
  audio.spin.play()
  locked.value = true
  calculate()
  setItemsAnimations()
  stopSpinAnimation()
}
const stopSpinAnimation = () => {
  setTimeout(() => {
    audio.spin.pause()
    locked.value = false
  }, 3000)
}
const setItemsAnimations = () => {
  divs.value[0].classList.add('spin')
  setTimeout(() => {
    divs.value[0].classList.remove('spin')
    divs.value[1].classList.add('spin')
    playStopSpin()
  }, 1000)
  setTimeout(() => {
    divs.value[1].classList.remove('spin')
    divs.value[2].classList.add('spin')
    playStopSpin()
  }, 2000)
  setTimeout(() => {
    divs.value[2].classList.remove('spin')
    playStopSpin()
  }, 3000)
}
const playStopSpin = () => {
  audio.spinEnd.currentTime = 0
  audio.spinEnd.play()
}
const cashOut = () => {
  if (userCredit.value == 0 || locked.value) return
  audio.action.play()
  userWalletCredit.value = userCredit.value
  userCredit.value = 0
}
const calculate = () => {
  let hasUserWin = roll()
  let reRoll = letsCheat()
  if (reRoll) hasUserWin = roll()
  let itemsArray = sampleItems
  let randomItem
  const randomNumber = Math.floor(Math.random() * itemsArray.length);
  randomItem = itemsArray[randomNumber]
  setPositions(hasUserWin, randomItem)
  setUserCredit(hasUserWin, randomItem)
}
const letsCheat = () => {
  let randCheat
  if (userCredit.value < 40) return false
  else if (userCredit.value >= 40 && userCredit.value <= 60) {
    randCheat = percentageChance([0, 100], [70, 30])
  } else if (userCredit.value > 60) {
    randCheat = percentageChance([0, 100], [40, 60])
  }
  return randCheat == 100;
}
const roll = () => {
  let rand = percentageChance([0, 100], [50, 50])
  return rand === 100;
}
const setPositions = (hasUserWin: boolean, roll: string) => {
  let itemsArray = sampleItems
  let time = 1000
  for (let i = 0; i < 3; i++) {
    let randomItem = ''
    if (!hasUserWin) {
      const randomNumber = Math.floor(Math.random() * itemsArray.length);
      randomItem = itemsArray[randomNumber]
      itemsArray = itemsArray.filter(item => item !== randomItem)
    }
    setTimeout(() => {
      divs.value[i].style.top = itemsPositionData[(hasUserWin ? roll : randomItem) as keyof itemsPosition] + 'px'
    }, time)
    time += 1000
  }
}
const setUserCredit = (hasUserWin: boolean, roll: string) => {
  if (!hasUserWin) return userCredit.value -= 1
  return userCredit.value += gameScoresData[roll as keyof gameScores]
}
const cheatCashOut = () => {
  if (!userCredit.value) return
  const shouldDisableButton = percentageChance([0, 100], [60, 40])
  const shouldMoveButton = percentageChance([0, 100], [50, 50])
  const randomDirection = percentageChance(['marginTop', 'marginBottom', 'marginLeft', 'marginRight'], [25, 25, 25, 25])
  if (shouldDisableButton) {
    buttonCashOut.value!.setAttribute('disabled', 'disabled')
  }
  if (shouldMoveButton) {
    buttonCashOut.value!.style[randomDirection as number] = '-300px'
  }
}

</script>
<style scoped lang="scss">
.main-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 0;
}

.row-0 {
  grid-area: 1 / 1 / 2 / 2;
}

.row-1 {
  grid-area: 1 / 2 / 2 / 3;
}

.row-2 {
  grid-area: 1 / 3 / 2 / 4;
}

.start-button {
  grid-area: 1/4/2/5;
  display: flex;
  background: #79b24d;
  border-radius: 19px;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #3a7a00;
  }

  p {
    color: white;
  }
}

.result-section {
  grid-area: 2 / 1 / 3 / 5;
  margin-top: 20px;
  margin-bottom: 12px;

  p {
    display: inline-block;
  }

  div {
    width: 47%;
    display: inline-block;
    text-align: center;
    background: #ffdc00;
    border-radius: 9px;
    margin: auto 5px;
  }
}

.rows {
  text-align: center;
  overflow: hidden;
  height: 67px;

  .row-item {
    height: 64px;
    position: relative;
    top: 0;
    display: flex;
    flex-direction: column;

    img {
      width: 64px;
      margin-bottom: 5px;
    }
  }
}

.cash-out {
  grid-area: 4/1/6/5;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  position: relative;

  button {
    color: white;
    background: #e55656;
    border: unset;
    border-radius: 5px;
    padding: 15px;
    cursor: pointer;

    &:hover {
      background: #b73939;
    }
  }
}

.spin {
  filter: blur(2px);
  -webkit-animation: slide-top 0.5s linear infinite;
  animation: slide-top 0.5s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-270px);
    transform: translateY(-270px);
  }
}

@keyframes slide-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-270px);
    transform: translateY(-270px);
  }
}


</style>