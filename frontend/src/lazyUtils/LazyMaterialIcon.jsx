import React, { Suspense, lazy } from 'react'

const iconsMap = {
  signin: lazy(() => import('@mui/icons-material/LoginRounded')),
  signout: lazy(() => import('@mui/icons-material/LogoutRounded')),
  signup: lazy(() => import('@mui/icons-material/AppRegistrationRounded')),
  settings: lazy(() => import('@mui/icons-material/Settings')),
  person: lazy(() => import('@mui/icons-material/PersonRounded')),
  accountCircle: lazy(() => import('@mui/icons-material/AccountCircleRounded')),
  arrowBack: lazy(() => import('@mui/icons-material/ArrowBackIosNewRounded')),
  arrowUp: lazy(() => import('@mui/icons-material/ArrowUpwardRounded')),
  lightModeIcon: lazy(() => import('@mui/icons-material/WbSunnyRounded')),
  darkModeIcon: lazy(() => import('@mui/icons-material/DarkModeRounded')),
  eyeClose: lazy(() => import('@mui/icons-material/RemoveRedEyeRounded')),
  eyeOpen: lazy(() => import('@mui/icons-material/RemoveRedEyeOutlined')),
  circleAppIcon: lazy(() => import('@mui/icons-material/Brightness1Rounded')),
  reTry: lazy(() => import('@mui/icons-material/ReplayRounded')),
}

const icons = {
  signin: "signin",
  signout: "signout",
  signup: "signup",
  settings: "settings",
  person: "person",
  accountCircle: "accountCircle",
  arrowBack: "arrowBack",
  arrowUp: "arrowUp",
  lightModeIcon: "lightModeIcon",
  darkModeIcon: "darkModeIcon",
  eyeClose: "eyeClose",
  eyeOpen: "eyeOpen",
  circleAppIcon: "circleAppIcon",
  reTry: "reTry",
}

const LazyMaterialIcon = ({ iconName, fallback = <span></span>, ...props }) => {
  const IconComponent = iconsMap[iconName]

  if (!IconComponent) {
    throw new Error("Icon not found")
    // return <div>Icon not found</div>
  }

  return (
    <Suspense fallback={fallback}>
      <IconComponent {...props} />
    </Suspense>
  )
}

export { LazyMaterialIcon, icons }
