<template>
    <div class="block" :style="blockStyle" :class="{ hidden: isMaxBlock }">
        <p v-if="!isMaxBlock" class="block-content" :style="textStyle">{{ block }}</p>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
    name: "Block",
    props: {
        block: {
            type: Number as PropType<number | null>,
            required: true
        },
        maxBlock: {
            type: Number as PropType<number>,
            required: true
        },
        blockSize: {
            type: Number as PropType<number>,
            default: 60 // Изменяя это значение, вы изменяете размер поля и блоков
        }
    },
    setup(props) {
        const isMaxBlock = computed(() => props.block === props.maxBlock);
        const blockStyle = computed(() => ({
            width: `${props.blockSize}px`,
            height: `${props.blockSize}px`
        }));
        // Размер шрифта динамический – составляет половину от размера блока
        const textStyle = computed(() => ({
            fontSize: `${props.blockSize * 0.6}px`
        }));
        return { isMaxBlock, blockStyle, textStyle };
    }
});
</script>

<style scoped>
.block {
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
}
.block-content {
    user-select: none;
}
.hidden {
    visibility: hidden;
}
</style>