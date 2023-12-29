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
    const Tet = new Date(2022, 0, 32);
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
  useEffect(() => {
    document.title = '';
  }, []);
  return (
    <>
      {/* {countdownTime.map((item, index) => {
        return (
          <li key={index} className={styles.countdownItem}>
            <div className={styles.timeValue}> {item.value} </div>
            <div className={styles.timeTitle}>{item.title} </div>
          </li>
        );
      })} */}
    </>
  );
};
export default function Firework() {
  const [countdownTitle, setCountdownTitle] = useState(
    'Đếm ngược đến giao thừa xuân Nhâm dần'
  );
  const [isPlay, setPlay] = React.useState(true);

  const goal = 'AN.TU.KH.TO, VI.VA.TU.KH.BA.CH.NU, CO.DU.GA.LA';

  const audioRef = useRef();

  return (
    <div className={styles.fireWorkWrapper}>
      <Particles countdownTitle={countdownTitle} goal={goal}></Particles>
      <h2 className={styles.countdownTitle}>{countdownTitle}</h2>
      {/* {countdownTitle === goal ? (
        <div>
          <div className={styles.LunarWrapper}>
            <img
              src='./images/tiger.png'
              className={styles.LunarIcon}
              alt='tiger'
            />
            <p className={styles.LunarYear}>Nhâm dần</p>
            <img
              src='./images/firework.png'
              className={styles.LunarIcon}
              alt='tiger'
            />
          </div>
        </div>
      ) : null} */}
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
