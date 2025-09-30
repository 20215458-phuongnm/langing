<template>
  <div class="chip-container">
    <div class="chip">
      <img :src="logo" :alt="altText" class="chip-logo" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  logo: {
    type: String,
    required: true,
    default: "",
  },
  altText: {
    type: String,
    default: "Logo",
  },
  size: {
    type: String,
    default: "medium", // small, medium, large
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
});
</script>

<style scoped>
.chip-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.chip {
  background: linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%);
  border-radius: 50px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9);
}

.chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chip-logo {
  height: 24px;
  width: auto;
  object-fit: contain;
  transition: all 0.3s ease;
}

/* Size variations */
.chip-container[data-size="small"] .chip {
  padding: 8px 16px;
}

.chip-container[data-size="small"] .chip-logo {
  height: 18px;
}

.chip-container[data-size="medium"] .chip {
  padding: 12px 24px;
}

.chip-container[data-size="medium"] .chip-logo {
  height: 24px;
}

.chip-container[data-size="large"] .chip {
  padding: 16px 32px;
}

.chip-container[data-size="large"] .chip-logo {
  height: 32px;
}

/* Responsive */
@media (max-width: 768px) {
  .chip {
    padding: 10px 20px;
  }

  .chip-logo {
    height: 20px;
  }
}
</style>
