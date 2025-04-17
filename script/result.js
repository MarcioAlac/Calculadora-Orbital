function OrbitCalc() {

    // Obter valores (convertendo para número e tratando casos inválidos)
    const planet_radius     = parseFloat(document.getElementById('raio').value) || 0; // KM
    const planet_orbit      = parseFloat(document.getElementById('height').value) || 0; // KM
    const planet_atmosphere = parseFloat(document.getElementById('atm_height').value) || 0; // KM
    const planet_gm         = parseFloat(document.getElementById('gm').value) || 1.447e14; // Constante Gravitacional 
    const planet_mass       = parseFloat(document.getElementById('mass').value) || 0; // Massa do Planeta

    const soft = 90;

    // Converter para metros
    let radiusPlanet_meters         = planet_radius * 1000;
    let planetOrbit_meters          = planet_orbit * 1000;
    const planetAtmosphere_meters   = planet_atmosphere * 1000;

    let ascentAngles = [];

    for(alt = 2000; alt < planetOrbit_meters; alt *= 2)
    {
        if(alt >= planetOrbit_meters)
            {
                break
            }
        
        ascentAngles.push({
            altitude:   alt,
            angulo:     AngleAscent(alt, planetOrbit_meters, soft)
        })
    }
    
    if(ascentAngles.length === 0 || ascentAngles[ascentAngles.length - 1] != planetOrbit_meters)
    {
        ascentAngles.push(
            {
                altitude: planetOrbit_meters,
                angulo: AngleAscent(alt, planetOrbit_meters, soft)
            }
        )
    }

    let response = [
        {
            Angulos: ascentAngles,
            DadosOrbitais: {
                VelocidadeOrbital:  orbitVelocity(planet_gm, radiusPlanet_meters, planetOrbit_meters),
                VelocidadeEscape:   escapeVelocity(planet_gm, radiusPlanet_meters, planetOrbit_meters),
                GravidadePorAltura: heightGravity(planet_gm, radiusPlanet_meters, planetOrbit_meters),
                TwrPorAltura:       heightTwr(heightGravity(planet_gm, radiusPlanet_meters, planetOrbit_meters), 4, 1000)
            }
        }
    ]
    
    console.log(response)
}

function AngleAscent(h, h_max, soft = 90)
{
    tetha = 90-soft*Math.sqrt(h/h_max) 
    return Math.max(tetha, 0)
}

function orbitVelocity(GM, RADIUS, ORBIT)
{
    r = RADIUS + ORBIT
    return orbitSpeed = Math.sqrt(GM / r) // m/s²
}

function escapeVelocity(GM, Radius, Orbit)
{
    return velocityEscape = Math.sqrt((2 * GM) / (Radius + Orbit))
}

function heightGravity(GM, Radius, Height)
{
    return gravity = GM / (Radius + Height) ** 2 // m/s²
}

function heightTwr(Gravity, twr, mass)
{
    return twr_out = twr * mass * Gravity // Newtons
}