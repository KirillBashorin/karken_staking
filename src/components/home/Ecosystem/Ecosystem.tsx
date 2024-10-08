'use client';

import React, {FC, useState, useEffect, useRef} from 'react';
import Image from "next/image";
import {Swiper as SwiperType} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/autoplay';
import {useTranslation} from "react-i18next";
import {motion} from 'framer-motion';

import {Wrapper} from "@/components/layout";
import {Title, Text} from "@/components/ui";
import {FadeOut, SwiperNavigation, TextCard} from "@/components/common";

import styles from './Ecosystem.module.css';

const Ecosystem: FC = () => {
    const {t} = useTranslation();

    const [isWide, setIsWide] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);
    const items = [
        {
            title: t('ecosystem:itemsDescription:token:title'),
            text: t('ecosystem:itemsDescription:token:text'),
        },
        {
            title: t('ecosystem:itemsDescription:tte-game:title'),
            text: t('ecosystem:itemsDescription:tte-game:text'),
        },
        {
            title: t('ecosystem:itemsDescription:geocaching:title'),
            text: t('ecosystem:itemsDescription:geocaching:text'),
        },
        {
            title: t('ecosystem:itemsDescription:game-v2:title'),
            text: t('ecosystem:itemsDescription:game-v2:text'),
        },
        {
            title: t('ecosystem:itemsDescription:nft:title'),
            text: t('ecosystem:itemsDescription:nft:text'),
        },
        {
            title: t('ecosystem:itemsDescription:staking:title'),
            text: t('ecosystem:itemsDescription:staking:text'),
        },
        {
            title: t('ecosystem:itemsDescription:launchpad:title'),
            text: t('ecosystem:itemsDescription:launchpad:text'),
        },
        {
            title: t('ecosystem:itemsDescription:charity:title'),
            text: t('ecosystem:itemsDescription:charity:text'),
        }
    ];

    const handleResize = () => {
        setIsWide(window.matchMedia('screen and (min-width: 768px)').matches);
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <section className={styles.root} id="ecosystem">
        <Wrapper>
            <div className={styles.inner}>
                <FadeOut>
                    <Title className={styles.title} size={'medium'} as={'h2'}
                           isNoShadow={true}>{t('ecosystem:titleDescription')}</Title>
                    <Text className={styles.text} size={'medium'}>{t('ecosystem:textDescription')}</Text>
                </FadeOut>

                {
                    isWide &&
                    <div className={styles.items}>
                        {items && items.length > 0 && items.map((item, index) => (
                            <TextCard title={item.title} text={item.text} key={item.title}/>
                        ))}
                    </div>
                }

                {
                    !isWide &&
                    <Swiper
                        className={styles.itemsSwiper}
                        onBeforeInit={(swiper) => swiperRef.current = swiper}
                        spaceBetween={20}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: true,
                        }}
                        modules={[Autoplay]}
                        loop={true}
                    >
                        {items && items.length > 0 && items.map((item) => (
                            <SwiperSlide className={styles.slide} key={item.title}>
                                <TextCard title={item.title} text={item.text}/>
                            </SwiperSlide>
                        ))}
                        <SwiperNavigation swiperRef={swiperRef}/>
                    </Swiper>
                }
            </div>

            <div className={styles.background}>
                <motion.div
                    className={styles.tentacleTopLeft}
                    initial="hidden"
                    whileInView="visible"
                    transition={{
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                    variants={{
                        hidden: {x: '-90%', y: '50%', rotate: 45},
                        visible: {x: 0, y: 0, rotate: 0},
                    }}
                >
                    <Image src={'/images/about-tentacle-1.png'} width={'454'} height={'549'} alt=""/>
                </motion.div>

                <motion.div
                    className={styles.tentacleTopRight}
                    initial="hidden"
                    whileInView="visible"
                    transition={{
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                    variants={{
                        hidden: {x: '90%', y: '50%', rotate: 45},
                        visible: {x: 0, y: 0, rotate: 0},
                    }}
                >
                    <Image src={'/images/about-tentacle-2.png'} width={'208'} height={'445'} alt=""/>
                </motion.div>

                <motion.div
                    className={styles.ship}
                    initial="hidden"
                    whileInView="visible"
                    transition={{
                        duration: 1.2,
                        ease: 'easeInOut',
                    }}
                    variants={{
                        hidden: {x: '50%', y: '-30%', scale: 0.5},
                        visible: {x: 0, y: 0, scale: 1},
                    }}
                >
                    <Image src={'/images/ship-map.png'} width={'360'} height={'250'} alt=""/>
                </motion.div>
            </div>
        </Wrapper>
    </section>
};

export default Ecosystem;
