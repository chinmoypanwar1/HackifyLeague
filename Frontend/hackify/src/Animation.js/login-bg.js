export const animateCircles = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
  
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1'; 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    let circles = [];
  
    const createCircles = () => {
      for (let i = 0; i < 75; i++) {
        circles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 30 + 10,
          color: ['#007bff', '#DFF5FF', '#67C6E3', '#0056b3', '#5356FF', '#66D1E8'][Math.floor(Math.random() * 6)],
          opacity: Math.random(),
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
        });
      }
    };
  
    const drawCircles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach((circle) => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(circle.color)}, ${circle.opacity})`;
        ctx.fill();
        circle.x += circle.speedX;
        circle.y += circle.speedY;

        if (circle.x < 0 || circle.x > canvas.width) circle.speedX *= -1;
        if (circle.y < 0 || circle.y > canvas.height) circle.speedY *= -1;
      });
    };
  
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r},${g},${b}`;
    };
  
    const animate = () => {
      drawCircles();
      requestAnimationFrame(animate);
    };
  
    createCircles();
    animate();
  
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  
    // Cleanup function to remove the canvas when the component is unmounted
    return () => {
      document.body.removeChild(canvas);
    };
  };
  