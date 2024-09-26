import React, { Suspense, lazy } from 'react'

const iconsMap = {
  Signin: lazy(() => import('@mui/icons-material/LoginRounded')),
  Signout: lazy(() => import('@mui/icons-material/LogoutRounded')),
  Signup: lazy(() => import('@mui/icons-material/AppRegistrationRounded')),
  Settings: lazy(() => import('@mui/icons-material/Settings')),
  Person: lazy(() => import('@mui/icons-material/PersonRounded')),
  AccountCircle: lazy(() => import('@mui/icons-material/AccountCircleRounded')),
  ArrowBack: lazy(() => import('@mui/icons-material/ArrowBackIosNewRounded')),
  ArrowUp: lazy(() => import('@mui/icons-material/ArrowUpwardRounded')),
  LightModeIcon: lazy(() => import('@mui/icons-material/WbSunnyRounded')),
  DarkModeIcon: lazy(() => import('@mui/icons-material/DarkModeRounded')),
  EyeClose: lazy(() => import('@mui/icons-material/RemoveRedEyeRounded')),
  EyeOpen: lazy(() => import('@mui/icons-material/RemoveRedEyeOutlined')),
  CircleAppIcon: lazy(() => import('@mui/icons-material/Brightness1Rounded')),
  ReTry: lazy(() => import('@mui/icons-material/ReplayRounded')),
}

const icons = {
  Signin: "Signin",
  Signout: "Signout",
  Signup: "Signup",
  Settings: "Settings",
  Person: "Person",
  AccountCircle: "AccountCircle",
  ArrowBack: "ArrowBack",
  ArrowUp: "ArrowUp",
  LightModeIcon: "LightModeIcon",
  DarkModeIcon: "DarkModeIcon",
  EyeClose: "EyeClose",
  EyeOpen: "EyeOpen",
  CircleAppIcon: "CircleAppIcon",
  ReTry: "ReTry",
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
