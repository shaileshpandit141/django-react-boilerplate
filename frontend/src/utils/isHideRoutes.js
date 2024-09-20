export function isHideRoutes(route_name) {

    let clean_route = null

    if (route_name.includes("/")) {
        clean_route = (route_name.split("/"))[1]
    } else {
        clean_route = route_name
    }

    const routes = [
        "",
        "signin",
        "resend-verification-key",
        "signup",
        "resend-verification-key",
        "forgot-password",
    ]

    return routes.includes(clean_route)
}