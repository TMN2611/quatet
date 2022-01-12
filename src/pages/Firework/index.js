import React, { useEffect, useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Particles from '../../components/Particle';
import ToggleButton from '@mui/material/ToggleButton';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import ClassName from 'classnames';
import { Grid } from '@mui/material';
import styles from './Firework.module.css';

const toggleAudioBtn = ClassName({
  'flex-center': true,
  [styles.toggleAudioBtn]: true,
});
const Countdown = ({ setCountdownTitle, goal }) => {
  const [countdownTime, setCountdownTime] = useState([]);

  const handleCalculatorCountdown = () => {
    const now = new Date();
    const Tet = new Date(2022, 0, 12, 21, 0);
    console.log(Tet);
    const currentTime = now.getTime();
    const TetTime = Tet.getTime();

    const remTime = TetTime - currentTime;
    if (remTime > 0) {
      var s = Math.floor(remTime / 1000);
      var m = Math.floor(s / 60);
      var h = Math.floor(m / 60);
      var d = Math.floor(h / 24);

      setCountdownTime([
        { title: 'Ngày', value: d },
        { title: 'Giờ', value: h % 24 },
        { title: 'Phút', value: m % 60 },
        { title: 'Giây', value: s % 60 },
      ]);
    } else {
      setCountdownTitle(goal);
      setCountdownTime([
        { title: 'Ngày', value: 0 },
        { title: 'Giờ', value: 0 },
        { title: 'Phút', value: 0 },
        { title: 'Giây', value: 0 },
      ]);
    }
  };
  useEffect(() => {
    handleCalculatorCountdown();
    const timerId = setInterval(() => {
      handleCalculatorCountdown();
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  return (
    <>
      {countdownTime.map((item, index) => {
        return (
          <li key={index} className={styles.countdownItem}>
            {item.value} {item.title}{' '}
          </li>
        );
      })}
    </>
  );
};
export default function Firework() {
  const [countdownTitle, setCountdownTitle] = useState('Đợi một chút');
  const [isPlay, setPlay] = React.useState(true);

  const goal = 'Đừng buồn nữa nhá ';

  const audioRef = useRef();

  useEffect(() => {
    // if (countdownTitle === goal) {
    //   // audioRef.current.audioEl.current.play();
    //   console.log([audioRef.current.audioEl.current]);
    // }
    // console.log(countdownTitle === goal);
  }, [countdownTitle]);
  return (
    <div style={{ marginTop: 40 }}>
      <Particles countdownTitle={countdownTitle} goal={goal}></Particles>
      <h2 className={styles.countdownTitle}>{countdownTitle}</h2>
      {countdownTitle === goal ? (
        <div>
          <div className={styles.LunarWrapper}>
            <img
              src='https://cdn-icons-png.flaticon.com/512/6525/6525850.png'
              className={styles.LunarIcon}
              alt='tiger'
            />
            <p className={styles.LunarYear}>Ngọt xinh đẹp </p>
            <img
              src='https://cdn-icons.flaticon.com/png/512/2682/premium/2682341.png?token=exp=1641994222~hmac=cc948217bead5d3f0c66d59598c8f4a4'
              className={styles.LunarIcon}
              alt='tiger'
            />
          </div>
        </div>
      ) : null}
      <ReactAudioPlayer
        src='https://dm0qx8t0i9gc9.cloudfront.net/previews/audio/BsTwCwBHBjzwub4i4/fireworks-show-looping_GJJxwH4__NWM.mp3'
        autoPlay
        muted={countdownTitle === goal ? false : true}
        controls
        loop
        ref={audioRef}
      />
      ;
      <div className={styles.countdownWrapper}>
        <ul className={styles.countdownList}>
          <Countdown setCountdownTitle={setCountdownTitle} goal={goal} />
        </ul>
      </div>
      <div className={toggleAudioBtn}>
        {countdownTitle === goal ? (
          <ToggleButton
            value='check'
            size='large'
            selected={isPlay}
            onChange={() => {
              setPlay(!isPlay);
              if (isPlay) {
                console.log([audioRef.current.audioEl.current]);
                audioRef.current.audioEl.current.pause();
              } else {
                audioRef.current.audioEl.current.play();
              }
            }}
          >
            {isPlay ? (
              <PauseCircleOutlinedIcon color='primary' fontSize='large' />
            ) : (
              <PlayCircleFilledWhiteOutlinedIcon
                color='primary'
                fontSize='large'
              />
            )}
          </ToggleButton>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
