const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('===================================================');
console.log('  KMTI iCAD Hub - Full Build Orchestration');
console.log('===================================================');

// Clean frontend directories
console.log('\nCleaning existing frontend builds...');
const distElectronDir = path.resolve(__dirname, 'dist-electron');
const distDir = path.resolve(__dirname, 'dist');

if (fs.existsSync(distElectronDir)) {
    console.log('Removing dist-electron/ ...');
    fs.rmSync(distElectronDir, { recursive: true, force: true });
}
if (fs.existsSync(distDir)) {
    console.log('Removing dist/ ...');
    fs.rmSync(distDir, { recursive: true, force: true });
}

// Step 1: Build the backend EXE
console.log('\n[1/2] Building Backend Standalone Server...');
const backendDir = path.resolve(__dirname, '../backend');
try {
    execSync('build_exe.bat', { 
        cwd: backendDir, 
        stdio: 'inherit',
        shell: true 
    });
} catch (error) {
    console.error('❌ Backend compilation failed.');
    process.exit(1);
}

// Step 2: Build and package the frontend installer
console.log('\n[2/2] Building and Packaging Electron Frontend...');
try {
    execSync('npm run package', { 
        cwd: __dirname, 
        stdio: 'inherit',
        shell: true 
    });
} catch (error) {
    console.error('❌ Frontend packaging failed.');
    process.exit(1);
}

console.log('\n===================================================');
console.log('✨ SUCCESS: All builds completed successfully!');
console.log('  - Backend Server: backend/dist/KMTI_iCAD_Server.exe');
console.log('  - Frontend Setup: frontend/dist-electron/KMTI_iCAD_Hub Setup *.exe');
console.log('===================================================');
