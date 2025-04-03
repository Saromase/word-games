<script setup lang="ts">
</script>

<template>
    <div class="confetti"></div>
    <div class="confetti"></div>
    <div class="confetti"></div>
    <div class="confetti"></div>
    <div class="confetti"></div>
</template>

<style scoped>
@keyframes confetti-fall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}

.confetti {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: red;
  opacity: 0;
  animation: confetti-fall 3s linear infinite;
}

/* Générer plusieurs confettis */
.confetti:nth-child(1) { left: 10%; background-color: yellow; animation-delay: 0s; }
.confetti:nth-child(2) { left: 30%; background-color: blue; animation-delay: 0.1s; }
.confetti:nth-child(3) { left: 50%; background-color: green; animation-delay: 0.2s; }
.confetti:nth-child(4) { left: 70%; background-color: pink; animation-delay: 0.3s; }
.confetti:nth-child(5) { left: 90%; background-color: purple; animation-delay: 0.4s; }
</style>
