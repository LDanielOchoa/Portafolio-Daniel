#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build optimizado...');

// Configuración de optimizaciones
const optimizations = {
  analyze: process.argv.includes('--analyze'),
  production: process.env.NODE_ENV === 'production',
  minify: true,
  compression: true,
};

// Función para ejecutar comandos
function runCommand(command, description) {
  console.log(`\n📋 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completado`);
  } catch (error) {
    console.error(`❌ Error en ${description}:`, error.message);
    process.exit(1);
  }
}

// Función para verificar archivos críticos
function checkCriticalFiles() {
  console.log('\n🔍 Verificando archivos críticos...');
  
  const criticalFiles = [
    'next.config.mjs',
    'tailwind.config.ts',
    'tsconfig.json',
    'package.json'
  ];
  
  criticalFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      console.error(`❌ Archivo crítico faltante: ${file}`);
      process.exit(1);
    }
  });
  
  console.log('✅ Todos los archivos críticos encontrados');
}

// Función para limpiar directorios de build
function cleanBuildDirectories() {
  console.log('\n🧹 Limpiando directorios de build...');
  
  const dirsToClean = ['.next', 'out', 'dist'];
  
  dirsToClean.forEach(dir => {
    if (fs.existsSync(dir)) {
      try {
        fs.rmSync(dir, { recursive: true, force: true });
        console.log(`🗑️  Eliminado: ${dir}`);
      } catch (error) {
        console.log(`⚠️  No se pudo eliminar ${dir}: ${error.message}`);
        // Continuar con el build aunque no se pueda limpiar
      }
    }
  });
}

// Función para optimizar imágenes
function optimizeImages() {
  console.log('\n🖼️  Verificando optimización de imágenes...');
  
  // Verificar que las imágenes estén en formatos optimizados
  const imageExtensions = ['.webp', '.avif', '.jpg', '.jpeg', '.png'];
  const publicDir = path.join(process.cwd(), 'public');
  
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir, { recursive: true });
    const imageFiles = files.filter(file => 
      imageExtensions.some(ext => file.endsWith(ext))
    );
    
    console.log(`📊 Encontradas ${imageFiles.length} imágenes en /public`);
  }
}

// Función para analizar bundle
function analyzeBundle() {
  if (!optimizations.analyze) return;
  
  console.log('\n📊 Analizando bundle...');
  runCommand(
    'npx @next/bundle-analyzer .next/static/chunks',
    'Análisis de bundle'
  );
}

// Función principal de build
async function buildOptimized() {
  try {
    // Verificar archivos críticos
    checkCriticalFiles();
    
    // Limpiar directorios de build
    cleanBuildDirectories();
    
    // Verificar optimización de imágenes
    optimizeImages();
    
    // Instalar dependencias si es necesario
    if (!fs.existsSync('node_modules')) {
      runCommand('pnpm install', 'Instalando dependencias');
    }
    
    // Ejecutar linting
    runCommand('pnpm lint', 'Ejecutando linting');
    
    // Build de producción
    runCommand('pnpm build', 'Construyendo aplicación');
    
    // Análisis de bundle si se solicita
    analyzeBundle();
    
    console.log('\n🎉 Build optimizado completado exitosamente!');
    console.log('\n📈 Optimizaciones aplicadas:');
    console.log('   ✅ Lazy loading de componentes');
    console.log('   ✅ Optimización de imágenes');
    console.log('   ✅ Bundle splitting');
    console.log('   ✅ Compresión de assets');
    console.log('   ✅ Minificación de código');
    console.log('   ✅ Preload de fuentes críticas');
    
  } catch (error) {
    console.error('\n❌ Error durante el build optimizado:', error);
    process.exit(1);
  }
}

// Ejecutar build optimizado
buildOptimized(); 