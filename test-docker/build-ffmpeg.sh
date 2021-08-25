#!/bin/sh

if [ -z $1 ]; then
  echo "\nError: Please specify number of threads as argument #1 for make\n"

else
  # install prerequisites
  sudo apt-get update -qq && sudo apt-get -y install \
    autoconf \
    automake \
    build-essential \
    cmake \
    git-core \
    libass-dev \
    libfreetype6-dev \
    libgnutls28-dev \
    libsdl2-dev \
    libtool \
    libva-dev \
    libvdpau-dev \
    libvorbis-dev \
    libxcb1-dev \
    libxcb-shm0-dev \
    libxcb-xfixes0-dev \
    meson \
    ninja-build \
    pkg-config \
    texinfo \
    wget \
    yasm \
    zlib1g-dev

  # make sources and bin
  mkdir -p ~/ffmpeg_sources ~/bin

  # compile x264
  # cd ~/ffmpeg_sources && \
  # git -C x264 pull 2> /dev/null || git clone --depth 1 https://code.videolan.org/videolan/x264.git && \
  # cd x264 && \
  # PATH="$HOME/bin:$PATH" PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig" ./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin" --enable-static --disable-opencl --enable-pic && \
  # PATH="$HOME/bin:$PATH" make && \
  # make -j$1 install

  sudo apt-get install libx264-dev -y
  # compile ffmpeg
  cd ~/ffmpeg_sources && \
  wget -O ffmpeg-snapshot.tar.bz2 https://ffmpeg.org/releases/ffmpeg-snapshot.tar.bz2 && \
  tar xjvf ffmpeg-snapshot.tar.bz2 && \
  cd ffmpeg && \
  PATH="$HOME/bin:$PATH" PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig" ./configure \
    --prefix="$HOME/ffmpeg_build" \
    --pkg-config-flags="--static" \
    --extra-cflags="-I$HOME/ffmpeg_build/include" \
    --extra-ldflags="-L$HOME/ffmpeg_build/lib" \
    --extra-libs="-lpthread -lm" \
    --ld="g++" \
    --bindir="$HOME/bin" \
    --enable-gpl \
    --enable-libx264 \
    --enable-libfdk-aac && \
  PATH="$HOME/bin:$PATH" make && \
  make -j$1 install && \
  hash -r
fi
  echo "Script exiting..."

# MIGHT NEED FFPROBE IN THE FUTURE? IDK
# custom commands: --disable-ffplay --disable-ffprobe --disable-doc 