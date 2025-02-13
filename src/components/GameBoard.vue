<template>
    <div class="game-board">
        <div v-for="(row, rowIndex) in gameBoard" :key="rowIndex" class="row">
            <Block 
            v-for="(block, colIndex) in row" 
            :key="colIndex" 
            :block="block" 
            :maxBlock="gameEngine.getBoardMaxValue()"
            :blockSize="65"
            @mousedown.native="handleMouseDown(rowIndex, colIndex)"
            @mouseenter.native="handleMouseMove(rowIndex, colIndex)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { GameEngine } from './GameEngine';
import Block from './Block.vue';

const gameEngine = new GameEngine(4, 4);
const gameBoard = gameEngine.getBoard(); // Получаем реактивный объект board
const dragging = ref(false);

function handleMouseDown(row: number, col: number) {
    dragging.value = true;
    handleMouseMove(row, col);
}

function handleMouseMove(row: number, col: number) {
    if (dragging.value) {
        gameEngine.AttemptMove(row, col);
    }
}

function handleMouseUp() {
    dragging.value = false;
}

function handleGlobalMouseDown() {
    dragging.value = true;
}

onMounted(() => {
    window.addEventListener('mousedown', handleGlobalMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
});

onUnmounted(() => {
    window.removeEventListener('mousedown', handleGlobalMouseDown);
    window.removeEventListener('mouseup', handleMouseUp);
});
</script>

<style scoped>
.game-board {
    border: 2px solid black;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.row {
    display: flex;
    gap: 5px;
}
</style>