<template>
    <footer>
        <div class="contenedorFooter">
            <div class="logoCOZCyT">
                <img src="@/assets/logo_cozcyt_lineas.png">
            </div>
            <div class="contacto">
                <h3>Contacto</h3>
                <a href="https://maps.app.goo.gl/d4exfpKbtaRAULmq5" target="_blank">
                    Avenida de la Juventud #504
                    Colonia Barros Sierra
                    C.P. 98090
                    Zacatecas, Zac.</a><br><br>
                <a href="mailto:contacto@cozcyt.gob.mx">contacto@cozcyt.gob.mx</a>
            </div>
            <div class="telefonos">
                <h3>TELÉFONOS</h3>
                <p>492 921 3228<br>
                    492 921 3018<br>
                    492 921 2816<br>
                    492 925 3308<br>
                </p>
            </div>
            <div class="logoCECODIC">
                <img src="@/assets/Picture3.png" />
            </div>
        </div>
        <div class="logosLabsol">
            <img src="../assets/Logos Labsol 2023-02.png" />
            <p>© LABSOL NETWORK 2024</p>
            <img src="../assets/GPLv3_Logo.svg.png" />
        </div>
    </footer>
</template>

<style>
footer {
    background-color: rgb(66, 66, 66);
    min-height: 290px;
    width: 100%;
    padding-top: 30px;
}

.contenedorFooter {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 50px;
}

.logoCECODIC img,
.logoCOZCyT img {
    height: 150px;
}

.logoCOZCyT,
.contacto,
.telefonos,
.logoCECODIC {
    width: 210px;
    color: white;
    line-height: 1.5;

    a {
        text-decoration: none;
        color: white;
    }

    a:hover {
        text-decoration: underline;
    }
}

.contacto,
.telefonos {
    margin-top: -20px;

}

.telefonos {
    margin-left: 10px;
}

.telefonos p {
    margin-left: 20px;
}

.logosLabsol {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.logosLabsol img {
    width: 100px;
    margin-bottom: 20px;
}

.logosLabsol p {
    color: white;
    margin: 0px 15%;
}
</style>