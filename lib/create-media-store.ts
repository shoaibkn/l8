import { create } from "zustand"

import type { CaptionsStore } from "@/hooks/limeplay/use-captions"
import type { PictureInPictureStore } from "@/hooks/limeplay/use-picture-in-picture"
import type { PlaylistStore } from "@/hooks/limeplay/use-playlist"
import type { PlaybackRateStore } from "@/hooks/limeplay/use-playback-rate"
import type { PlaybackStore } from "@/hooks/limeplay/use-playback"
import type { PlayerStore } from "@/hooks/limeplay/use-player"
import type { TimelineStore } from "@/hooks/limeplay/use-timeline"
import type { VolumeStore } from "@/hooks/limeplay/use-volume"

import { createCaptionsStore } from "@/hooks/limeplay/use-captions"
import { createPictureInPictureStore } from "@/hooks/limeplay/use-picture-in-picture"
import { createPlaybackRateStore } from "@/hooks/limeplay/use-playback-rate"
import { createPlaybackStore } from "@/hooks/limeplay/use-playback"
import { createPlayerStore } from "@/hooks/limeplay/use-player"
import { createPlaylistStore } from "@/hooks/limeplay/use-playlist"
import { createTimelineStore } from "@/hooks/limeplay/use-timeline"
import { createVolumeStore } from "@/hooks/limeplay/use-volume"

export interface CreateMediaStoreProps {
  debug?: boolean
}

export type TypeMediaStore = CaptionsStore &
  PictureInPictureStore &
  PlaylistStore &
  PlaybackRateStore &
  PlaybackStore &
  PlayerStore &
  TimelineStore &
  VolumeStore

export function createMediaStore(initProps?: Partial<CreateMediaStoreProps>) {
  const mediaStore = create<TypeMediaStore>()((...etc) => ({
    ...createPlaybackStore(...etc),
    ...createPlayerStore(...etc),
    ...createTimelineStore(...etc),
    ...createVolumeStore(...etc),
    ...createCaptionsStore(...etc),
    ...createPictureInPictureStore(...etc),
    ...createPlaybackRateStore(...etc),
    ...createPlaylistStore(...etc),
    ...initProps,
  }))
  return mediaStore
}
