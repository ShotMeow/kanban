import React, { type FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AnimatePresence, motion } from 'framer-motion';

import { AddColumnModal, ColumnItem, type ColumnType } from '@/entities/Column';

import 'swiper/css';
import 'swiper/css/free-mode';

import styles from './TaskBoard.module.scss';

interface Props {
  columns: ColumnType[];
}

export const TaskBoard: FC<Props> = ({ columns }) => {
  const [addColumnModalShown, setAddColumnModalShown] = useState<boolean>(false);

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className={styles.board}
      >
        <Swiper
          breakpoints={{
            0: {
              spaceBetween: 20,
            },
            375: {
              spaceBetween: 40,
            },
            1024: {
              spaceBetween: 20,
            },
          }}
          slidesPerView="auto"
          className={styles.columns}
        >
          {columns.map((column) => (
            <SwiperSlide className={styles.column} key={column.id}>
              <ColumnItem column={column} />
            </SwiperSlide>
          ))}
          <SwiperSlide className={styles.column}>
            <motion.button
              onClick={() => {
                setAddColumnModalShown(true);
              }}
            >
              + New Column
            </motion.button>
          </SwiperSlide>
        </Swiper>
      </motion.div>
      <AnimatePresence>
        {addColumnModalShown && (
          <AddColumnModal setAddColumnModalShown={setAddColumnModalShown} addColumnModalShown={addColumnModalShown} />
        )}
      </AnimatePresence>
    </>
  );
};
