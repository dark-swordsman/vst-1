# ---       should probably convert this to a shell script that is copied to the container
FROM        alpine:3.12 AS base

ADD         ./test.js /root/test.js

RUN         apk add --update nodejs nodejs-npm

FROM        base AS build

WORKDIR     /tmp/workdir

ENV         FFMPEG_VERSION=4.3.2 \
            AOM_VERSION=v1.0.0 \
            X264_VERSION=20170226-2245-stable \
            FDKAAC_VERSION=0.1.5 \
            LIBZMQ_VERSION=4.3.2 \
            SRC=/usr/local

ARG         FREETYPE_SHA256SUM="5eab795ebb23ac77001cfb68b7d4d50b5d6c7469247b0b01b2c953269f658dac freetype-2.10.4.tar.gz"
ARG         FRIBIDI_SHA256SUM="3fc96fa9473bd31dcb5500bdf1aa78b337ba13eb8c301e7c28923fea982453a8 0.19.7.tar.gz"
ARG         LIBASS_SHA256SUM="8fadf294bf701300d4605e6f1d92929304187fca4b8d8a47889315526adbafd7 0.13.7.tar.gz"
ARG         LIBVIDSTAB_SHA256SUM="14d2a053e56edad4f397be0cb3ef8eb1ec3150404ce99a426c4eb641861dc0bb v1.1.0.tar.gz"
ARG         OGG_SHA256SUM="e19ee34711d7af328cb26287f4137e70630e7261b17cbe3cd41011d73a654692 libogg-1.3.2.tar.gz"
ARG         OPUS_SHA256SUM="77db45a87b51578fbc49555ef1b10926179861d854eb2613207dc79d9ec0a9a9 opus-1.2.tar.gz"
ARG         THEORA_SHA256SUM="40952956c47811928d1e7922cda3bc1f427eb75680c3c37249c91e949054916b libtheora-1.1.1.tar.gz"
ARG         VORBIS_SHA256SUM="6efbcecdd3e5dfbf090341b485da9d176eb250d893e3eb378c428a2db38301ce libvorbis-1.3.5.tar.gz"
ARG         XVID_SHA256SUM="4e9fd62728885855bc5007fe1be58df42e5e274497591fec37249e1052ae316f xvidcore-1.3.4.tar.gz"
ARG         LIBXML2_SHA256SUM="f07dab13bf42d2b8db80620cce7419b3b87827cc937c8bb20fe13b8571ee9501  libxml2-v2.9.10.tar.gz"
ARG         LIBBLURAY_SHA256SUM="a3dd452239b100dc9da0d01b30e1692693e2a332a7d29917bf84bb10ea7c0b42 libbluray-1.1.2.tar.bz2"
ARG         LIBZMQ_SHA256SUM="02ecc88466ae38cf2c8d79f09cfd2675ba299a439680b64ade733e26a349edeb v4.3.2.tar.gz"
ARG         LIBARIBB24_SHA256SUM="f61560738926e57f9173510389634d8c06cabedfa857db4b28fb7704707ff128 v1.0.3.tar.gz"
ARG         LIBVMAF_SHA256SUM="e7fc00ae1322a7eccfcf6d4f1cdf9c67eec8058709887c8c6c3795c617326f77 v2.1.1.tar.gz"

RUN         export NUMCPUS=`grep -c '^processor' /proc/cpuinfo`

ARG         LD_LIBRARY_PATH=/opt/ffmpeg/lib
ARG         MAKEFLAGS="-j$NUMCPU"
ARG         PKG_CONFIG_PATH="/opt/ffmpeg/share/pkgconfig:/opt/ffmpeg/lib/pkgconfig:/opt/ffmpeg/lib64/pkgconfig"
ARG         PREFIX=/opt/ffmpeg
ARG         LD_LIBRARY_PATH="/opt/ffmpeg/lib:/opt/ffmpeg/lib64"

RUN         apk add --no-cache --update libgcc libstdc++ ca-certificates libcrypto1.1 libssl1.1 libgomp expat git && \
            \
            buildDeps="autoconf \
                   automake \
                   bash \
                   binutils \
                   bzip2 \
                   cmake \
                   curl \
                   coreutils \
                   diffutils \
                   file \
                   g++ \
                   gcc \
                   gperf \
                   libtool \
                   make \
                   python3 \
                   openssl-dev \
                   tar \
                   yasm \
                   nasm \
                   zlib-dev \
                   expat-dev" && \
        apk add --no-cache --update ${buildDeps} && \
        \
        DIR1=/tmp/x264 && \
        mkdir -p ${DIR1} && \
        cd ${DIR1} && \
        curl -sL https://download.videolan.org/pub/videolan/x264/snapshots/x264-snapshot-${X264_VERSION}.tar.bz2 | \
        tar -jx --strip-components=1 && \
        ./configure --prefix="${PREFIX}" --enable-shared --enable-pic --disable-cli && \
        make && \
        make install && \
        rm -rf ${DIR1} && \
        \
        DIR2=/tmp/fdk-aac && \
        mkdir -p ${DIR2} && \
        cd ${DIR2} && \
        curl -sL https://github.com/mstorsjo/fdk-aac/archive/v${FDKAAC_VERSION}.tar.gz | \
        tar -zx --strip-components=1 && \
        autoreconf -fiv && \
        ./configure --prefix="${PREFIX}" --enable-shared --datadir="${DIR2}" && \
        make && \
        make install && \
        rm -rf ${DIR2} && \
        # \
        # DIR3=/tmp/aom && \
        # git clone --branch ${AOM_VERSION} --depth 1 https://aomedia.googlesource.com/aom ${DIR3} && \
        # cd ${DIR3} && \
        # rm -rf CMakeCache.txt CMakeFiles && \
        # mkdir -p ./aom_build && \
        # cd ./aom_build && \
        # cmake -DCMAKE_INSTALL_PREFIX="${PREFIX}" -DBUILD_SHARED_LIBS=1 .. && \
        # make && \
        # make install && \
        # rm -rf ${DIR3} && \
# ## libzmq https://github.com/zeromq/libzmq/
# RUN \
#         DIR=/tmp/libzmq && \
#         mkdir -p ${DIR} && \
#         cd ${DIR} && \
#         curl -sLO https://github.com/zeromq/libzmq/archive/v${LIBZMQ_VERSION}.tar.gz && \
#         echo ${LIBZMQ_SHA256SUM} | sha256sum --check && \
#         tar -xz --strip-components=1 -f v${LIBZMQ_VERSION}.tar.gz && \
#         ./autogen.sh && \
#         ./configure --prefix="${PREFIX}" && \
#         make && \
#         make check && \
#         make install && \
#         rm -rf ${DIR}
        \
        DIR4=/tmp/ffmpeg && mkdir -p ${DIR4} && cd ${DIR4} && \
        curl -sLO https://ffmpeg.org/releases/ffmpeg-${FFMPEG_VERSION}.tar.bz2 && \
        tar -jx --strip-components=1 -f ffmpeg-${FFMPEG_VERSION}.tar.bz2 && \
        \
        DIR5=/tmp/ffmpeg && mkdir -p ${DIR5} && cd ${DIR5} && \
        ./configure \
        --disable-debug \
        # --disable-doc \
        --disable-ffplay \
        --disable-ffprobe \
        --enable-libx264 \
        --enable-gpl \
        --enable-nonfree \
        --enable-openssl \
        --enable-libfdk_aac \
        --enable-small \
        --enable-version3 \
        # --enable-libaom \
        # --enable-libzmq \
        --extra-libs=-lpthread \
        --prefix="${PREFIX}" \
        --extra-cflags="-I${PREFIX}/include" \
        --extra-ldflags="-L${PREFIX}/lib" && \
        make && \
        make install && \
        # make tools/zmqsend && cp tools/zmqsend ${PREFIX}/bin/ && \
        make distclean && \
        hash -r && \
        cd tools && \
        make qt-faststart && cp qt-faststart ${PREFIX}/bin/ && \
        \
    ldd ${PREFIX}/bin/ffmpeg | grep opt/ffmpeg | cut -d ' ' -f 3 | xargs -i cp {} /usr/local/lib/ && \
    for lib in /usr/local/lib/*.so.*; do ln -s "${lib##*/}" "${lib%%.so.*}".so; done && \
    cp ${PREFIX}/bin/* /usr/local/bin/ && \
    cp -r ${PREFIX}/share/ffmpeg /usr/local/share/ && \
    LD_LIBRARY_PATH=/usr/local/lib ffmpeg -buildconf && \
    mkdir -p /usr/local/include && \
    cp -r ${PREFIX}/include/libav* ${PREFIX}/include/libpostproc ${PREFIX}/include/libsw* /usr/local/include && \
    mkdir -p /usr/local/lib/pkgconfig && \
    for pc in ${PREFIX}/lib/pkgconfig/libav*.pc ${PREFIX}/lib/pkgconfig/libpostproc.pc ${PREFIX}/lib/pkgconfig/libsw*.pc; do \
        sed "s:${PREFIX}:/usr/local:g" <"$pc" >/usr/local/lib/pkgconfig/"${pc##*/}"; \
    done && \
# kind of clean up - probably will break a lot of things
# gotta find a way to strip all this shit back out, because ~200 MB is still way too large. Should be less than 50 MB.
\
        apk del libgcc libstdc++ ca-certificates libcrypto1.1 libssl1.1 libgomp expat git && \
        cd /usr/lib && \
        rm -rf gcc/ perl5/ *.a python3.8/ && \
        rm -rf /usr/libexec/gcc && \
        cd /usr/bin && \
        rm -rf ctest cpack cmake ccmake nasm && \
        cd /usr/share && \
        rm -rf misc/ cmake/ perl5/ && \
        cd / && \
        rm -rf /tmp/ffmpeg /tmp/workdir && \
        rm -rf /usr/lib/node_modules /usr/include && \
        rm -rf /opt/ffmpeg

# CMD     cd && npm i express && node test.js