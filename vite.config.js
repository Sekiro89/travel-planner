import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TriangleUpIcon } from '@chakra-ui/icons'

// https://vite.dev/config/
export default defineConfig({
    base: '/travel-planner/',
    plugins: [react()],
})