export const queryKeys = {
  all: () => ["auth"],
  userProfile: () => [...queryKeys.all(), "profile"],
  userAvatar: () => [...queryKeys.all(), "profile", "avatar"],
};
