// Water intake animation
document.addEventListener('DOMContentLoaded', function() {
    // Water tracking variables
    const waterAmount = 1.8; // Liters consumed
    const waterGoal = 2.5; // Daily goal in liters
    const waterPercentage = Math.round((waterAmount / waterGoal) * 100);
    
    // Update water display
    document.getElementById('waterAmount').textContent = waterAmount;
    document.getElementById('waterPercentage').textContent = waterPercentage;
    
    // Animate water fill on load
    const waterFill = document.querySelector('.water-fill');
    if (waterFill) {
        const fillHeight = 400 * (waterPercentage / 100);
        const yPosition = 400 - fillHeight;
        waterFill.setAttribute('y', yPosition);
        waterFill.setAttribute('height', fillHeight);
        
        // Add gradient for water effect
        const svg = document.querySelector('.body-outline');
        const defs = svg.querySelector('defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'waterGradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '0%');
        gradient.setAttribute('y2', '100%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('style', 'stop-color:#4facfe;stop-opacity:0.8');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('style', 'stop-color:#00f2fe;stop-opacity:0.9');
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        
        waterFill.setAttribute('fill', 'url(#waterGradient)');
    }
    
    // Calorie tracking variables
    const calorieAmount = 1650; // Calories consumed
    const calorieGoal = 2000; // Daily goal
    const caloriePercentage = Math.round((calorieAmount / calorieGoal) * 100);
    
    // Update calorie display
    document.getElementById('calorieAmount').textContent = calorieAmount;
    document.getElementById('caloriePercentage').textContent = caloriePercentage;
    
    // Weight Progress Graph
    drawWeightGraph();
});

function drawWeightGraph() {
    const canvas = document.getElementById('weightGraph');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth - 40;
    canvas.height = 300;
    
    // Weight data (last 8 weeks)
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];
    const weights = [82.0, 81.2, 80.5, 79.8, 78.5, 77.2, 76.0, 75.2];
    const goalWeight = 70.0;
    
    // Graph dimensions
    const padding = 50;
    const graphWidth = canvas.width - padding * 2;
    const graphHeight = canvas.height - padding * 2;
    
    // Calculate scales
    const maxWeight = Math.max(...weights) + 2;
    const minWeight = Math.min(goalWeight - 2, Math.min(...weights) - 2);
    const weightRange = maxWeight - minWeight;
    
    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
        
        // Y-axis labels
        const weight = maxWeight - (weightRange / 5) * i;
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(weight.toFixed(1) + ' kg', padding - 10, y + 4);
    }
    
    // Draw goal line
    const goalY = padding + ((maxWeight - goalWeight) / weightRange) * graphHeight;
    ctx.strokeStyle = '#90ee90';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, goalY);
    ctx.lineTo(canvas.width - padding, goalY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Goal label
    ctx.fillStyle = '#90ee90';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Goal: ' + goalWeight + ' kg', canvas.width - padding + 10, goalY + 4);
    
    // Draw weight line
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const xStep = graphWidth / (weeks.length - 1);
    
    weights.forEach((weight, index) => {
        const x = padding + xStep * index;
        const y = padding + ((maxWeight - weight) / weightRange) * graphHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw data points
    weights.forEach((weight, index) => {
        const x = padding + xStep * index;
        const y = padding + ((maxWeight - weight) / weightRange) * graphHeight;
        
        // Outer circle
        ctx.fillStyle = '#667eea';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner circle
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // X-axis labels
        ctx.fillStyle = '#666';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(weeks[index], x, canvas.height - padding + 20);
        
        // Weight value on hover effect
        ctx.fillStyle = '#764ba2';
        ctx.font = 'bold 11px Arial';
        ctx.fillText(weight.toFixed(1) + 'kg', x, y - 15);
    });
    
    // Add gradient fill under the line
    const gradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding);
    gradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
    gradient.addColorStop(1, 'rgba(102, 126, 234, 0.05)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    
    weights.forEach((weight, index) => {
        const x = padding + xStep * index;
        const y = padding + ((maxWeight - weight) / weightRange) * graphHeight;
        ctx.lineTo(x, y);
    });
    
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Add animation on load
    animateGraph();
}

function animateGraph() {
    const canvas = document.getElementById('weightGraph');
    let opacity = 0;
    let scale = 0.8;
    
    function animate() {
        if (opacity < 1) {
            opacity += 0.02;
            scale += 0.004;
            canvas.style.opacity = opacity;
            canvas.style.transform = `scale(${scale})`;
            requestAnimationFrame(animate);
        } else {
            canvas.style.transform = 'scale(1)';
        }
    }
    
    canvas.style.opacity = 0;
    canvas.style.transform = 'scale(0.8)';
    canvas.style.transition = 'transform 0.3s ease';
    animate();
}

// Responsive graph redraw
window.addEventListener('resize', function() {
    drawWeightGraph();
});

// Add interactive hover effects for the body outline
const bodyOutlineContainer = document.querySelector('.body-outline-container');
const bodyOutline = document.querySelector('.body-outline');

if (bodyOutlineContainer && bodyOutline) {
    bodyOutlineContainer.addEventListener('mouseenter', function() {
        // Subtle pulse effect on water
        const waterFill = document.querySelector('.water-fill');
        if (waterFill) {
            waterFill.style.transition = 'all 0.3s ease';
        }
    });
}

// Add interactive hover effects for the food plate
const plateContainer = document.querySelector('.plate-container');
const foodPlate = document.querySelector('.food-plate');

if (plateContainer && foodPlate) {
    const foodItems = foodPlate.querySelectorAll('.food-item');
    
    foodItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15)';
            this.style.filter = 'brightness(1.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'brightness(1)';
        });
    });
}

// Add click interactions for future features
document.querySelector('.body-outline-container')?.addEventListener('click', function() {
    console.log('Water tracking clicked - could open detailed view');
});

document.querySelector('.plate-container')?.addEventListener('click', function() {
    console.log('Calorie tracking clicked - could open meal log');
});

// Progress calculation
function calculateProgress() {
    const startWeight = 82.0;
    const currentWeight = 75.2;
    const goalWeight = 70.0;
    
    const totalLoss = startWeight - currentWeight;
    const totalToLose = startWeight - goalWeight;
    const progressPercentage = Math.round((totalLoss / totalToLose) * 100);
    
    console.log(`Progress: ${progressPercentage}% to goal (${totalLoss.toFixed(1)} kg lost)`);
    
    return {
        totalLoss,
        totalToLose,
        progressPercentage
    };
}

// Initialize progress
calculateProgress();
