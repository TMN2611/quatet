import React from 'react';
import Particles from 'react-tsparticles';
export default function Particle() {
  const particlesInit = main => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = container => {
    console.log(container);
  };
  return (
    <Particles
      id='tsparticles'
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: false,
        },
        // background: {
        //   color: {
        //     value: '#0d47a1',
        //   },
        // },
        position: 'fixed',
        fpsLimit: 1000,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 50,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: '#ffffff',
            distance: 120,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 600,
            },
            value: 90,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            random: true,
            value: 2,
          },
        },
        detectRetina: true,
      }}
    />
  );
}
