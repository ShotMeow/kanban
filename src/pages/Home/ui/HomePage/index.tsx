import React, { type FC, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';

import { boardApi, getCurrentBoard } from '@/entities/Board';
import { ColumnItem, getColumns, columnApi, AddColumnModal } from '@/entities/Column';
import { useAuthContext } from '@/features/Authorize';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';

import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
  const [addColumnModalShown, setAddColumnModalShown] = useState<boolean>(false);
  const columns = useSelector(getColumns);

  const { user } = useAuthContext();
  const currentBoard = useSelector(getCurrentBoard);

  const { refetch: columnsRefetch } = columnApi.useGetColumnsQuery({
    userId: user?.uid || '',
    boardId: currentBoard?.id || '',
  });
  const { refetch: iconsRefetch } = boardApi.useGetIconsQuery();

  useEffect(() => {
    void columnsRefetch();
  }, [user, currentBoard]);

  useEffect(() => {
    void iconsRefetch();
  }, []);

  return (
    <main className={styles.home}>
      {currentBoard && (
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 'auto',
            },
          }}
          className={styles.columns}
        >
          {columns?.map((column) => (
            <SwiperSlide className={styles.column} key={column.id}>
              <ColumnItem column={column} />
            </SwiperSlide>
          ))}
          <SwiperSlide className={styles.column}>
            <motion.button
              onClick={(event) => {
                event.stopPropagation();
                setAddColumnModalShown(true);
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
            >
              + New Column
            </motion.button>
          </SwiperSlide>
        </Swiper>
      )}
      <AnimatePresence>
        {addColumnModalShown && (
          <AddColumnModal setAddColumnModalShown={setAddColumnModalShown} addColumnModalShown={addColumnModalShown} />
        )}
      </AnimatePresence>
    </main>
  );
};
