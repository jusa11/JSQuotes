import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Orbit from './Orbit';
import Planet from './Planet';
import qoutes from '../../../data/qoutes';

gsap.registerPlugin(MotionPathPlugin);

const Space = () => {
  const orbitRef = useRef([]);
  const planetRef = useRef([]);

  const orbitData = [
    {
      id: 1,
      width: 703,
      height: 707,
      d: 'M351.445 705.961C544.745 705.961 701.445 548.141 701.445 353.461C701.445 158.781 544.745 0.961182 351.445 0.961182C158.146 0.961182 1.44531 158.781 1.44531 353.461C1.44531 548.141 158.146 705.961 351.445 705.961Z',
    },
    {
      id: 2,
      width: 601,
      height: 604,
      d: 'M300.445 602.961C465.579 602.961 599.445 468.199 599.445 301.961C599.445 135.723 465.579 0.961182 300.445 0.961182C135.312 0.961182 1.44531 135.723 1.44531 301.961C1.44531 468.199 135.312 602.961 300.445 602.961Z',
    },
    {
      id: 3,
      width: 505,
      height: 507,
      d: 'M252.445 505.961C391.069 505.961 503.445 392.913 503.445 253.461C503.445 114.009 391.069 0.961182 252.445 0.961182C113.822 0.961182 1.44531 114.009 1.44531 253.461C1.44531 392.913 113.822 505.961 252.445 505.961Z',
    },
    {
      id: 4,
      width: 403,
      height: 404,
      d: 'M201.445 402.961C311.902 402.961 401.445 312.97 401.445 201.961C401.445 90.952 311.902 0.961182 201.445 0.961182C90.9883 0.961182 1.44531 90.952 1.44531 201.961C1.44531 312.97 90.9883 402.961 201.445 402.961Z',
    },
    {
      id: 5,
      width: 303,
      height: 303,
      d: 'M151.445 301.961C234.288 301.961 301.445 234.58 301.445 151.461C301.445 68.3423 234.288 0.961182 151.445 0.961182C68.6026 0.961182 1.44531 68.3423 1.44531 151.461C1.44531 234.58 68.6026 301.961 151.445 301.961Z',
    },
  ];

  const randomSpeed = () => Math.floor(Math.random() * (10 - 5) + 5);
  const randomPosition = () => Math.random() * (0.9 - 0.1) + 0.1;

  useEffect(() => {
    // Перезапуск анимаций GSAP после монтирования Swiper
    planetRef.current.forEach((planet, index) => {
      const path = orbitRef.current[index];
      if (path && planet) {
        gsap
          .to(planet, {
            duration: randomSpeed(),
            repeat: -1,
            ease: 'linear',
            rotation: 360,
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
            },
          })
          .progress(randomPosition());
      }
    });
  }, [qoutes]); // Зависимость от quotes, чтобы анимации перезапускались при изменении данных

  return (
    <section className="space">
      <h2 className="visually-hidden">орбиты</h2>
      <div className="space__content">
        <div className="space__orbit">
          {orbitData.map((orbit, index) => {
            return (
              <Orbit
                key={`orbit-${orbit.id}`}
                ref={(el) => (orbitRef.current[index] = el)}
                {...orbit}
              />
            );
          })}
          <div className="orbit-center">
            <img src="src/img/space-content/spase-center.png" alt="" />
          </div>
        </div>

        {orbitData.map((orbit, index) => {
          return (
            <div className="planet__quote" key={`planet__quote-${orbit.id}`}>
              <Planet
                id={orbit.id}
                ref={(el) => (planetRef.current[index] = el)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Space;
