import * as React from 'react'
function SplitNames (){
    let employee = [
        "Wondemagegn Ginamo ", 
        "Simegn Gemechu ", 
        "Dienekayehu Sorisa ", 
        "Muluken Nigatu ", 
        "Birke Ambachew ", 
        "Getenet Wale ", 
        "Samueal kare ", 
        "Selam Ali ", 
        "Belayenesh Bekele ", 
        "Genet Bafa ", 
        "Etaferahu Zena ", 
        "Alem Kidane ", 
        "Asrat  Mena ", 
        "Wubitu  Ermias ", 
        "Alemitu Doyamo ", 
        "Aster Melese ", 
        "Fantu Mohammed ", 
        "Genet Shonka ", 
        "Tadelech Tesema ", 
        "Bizunesh Buhala  ", 
        "Desta ashebo ", 
        "Samueal Abeba ", 
        "Elesa Metku ", 
        "Asetere Mena ", 
        "Jemal Ibrahem ", 
        "Yasine Yohanes ", 
        "Dawite Tadesse ", 
        "Tadle Tantu ", 
        "Beyene Dangiso ", 
        "Eyasu Meskalye ", 
        "Abinezer Zerihune", 
        "Tamene Tadiwos ", 
        "Abreham tadesse ", 
        "Enderyas Docha ", 
        "Simon Bonja ", 
        "Eyasu Elias ", 
        "Tadelech sime ", 
        "Hayilu Kuyala ", 
        "Asegedech Hayiso ", 
        "Elesabet Yohanes ", 
        "Matiwose esayas ", 
        "Getahun Negusse ", 
        "Sintayehu Bahiru ", 
        "Belay Delelegne ", 
        "Getu Dangisso ", 
        "Solomon Melese ", 
        "Ephrem shawol ", 
        "Melese Girma ", 
        "Petrose Moshe ", 
        "Yohanes Batiso ", 
        "Wolansa kumea ", 
        "Arega Areru ", 
        "Kebebewu Mekonene ", 
        "Malo Damotu ", 
        "Deneke Kalta ", 
        "Abreham Fenecho ", 
        "Yeredawe Habetamu ", 
        "Alemaze Daricho ", 
        "Demesse Dabaro ", 
        "Kidist  Belachew ", 
        "Martha Israel ", 
        "Tigist Asmamaw ", 
        "Denkinsh Tilahun ", 
        "kefily kebede ", 
        "Tsige Maru ", 
        "Abaynesh Goneta ", 
        "Nadame Burka ", 
        "Fikerte Abera ", 
        "Tsiyon Kibicha ", 
        "Alemitu Kassahune ", 
        "Azalech Danessaa ", 
        "Merone Sisay ", 
        "Ayinalem Weled/Gebral ", 
        "Ledet Adane ", 
        "Matiwos Marikos ", 
        "Daniel Kebato ", 
        "Bizeneh Kidane ", 
        "Temesgen Kolcha ", 
        "Hagirso Lewawa ", 
        "Ermias Kebede ", 
        "Ashenafi Tesfaye ", 
        "Getu  Bulbula ", 
        "Teshome bitew ", 
        "Fantahune Abebe ", 
        "yosef Banedae ", 
        "Getahun Basa ", 
        "Melese Lelamo ", 
        "Alemu Negatu ", 
        "Belay Garo ", 
        "Tariku Doyamo ", 
        "Sebele Getachew ", 
        "Elesabeat Alemu ", 
        "Fasika Simon ", 
        "Meklit Abera ", 
        "Eyasu Woreku ", 
        "Tatek Bune ", 
        "Tadios Bafa ", 
        "Dawit Bafa ", 
        "Tigist shitaye ", 
        "Zenebech Gosaye ", 
        "Oumar Sariso ", 
        "Melese Bela ", 
        "Dawit  Henok ", 
        "Mirtnesh Asfaw ", 
        "Matiwose dule ", 
        "Eyamo Feyissa ", 
        "Jemal Abdela ", 
        "Setota Haile ", 
        "Marsamo Yohahis ", 
       "Getachew gelimesa ", 
       "Tsegaye Gorbe ", 
       "Tumato Tureche ", 
       "Marekos malo ", 
       "Diseta Lalimo ", 
       "Abebaywe Shferawe ", 
       "Belay Bokanesa ", 
       "Hignesh  tesema ", 
       "Zeweditu Mena ", 
       "Wegene Deguna ", 
       "Meskerem Eyasu ", 
       "Toleshe Taye ", 
       "Selamawit boda ", 
       "Filipose Matiwose ", 
       "Kaleb Fanecho ", 
       "Tariku Hayiso ", 
       "Kassahune Koche ", 
       "Isayase Eshetu ", 
       "Robal Teshome ", 
       "Bethalyam Albachew ", 
       "Sisay Kolech ", 
       "Mataworek Kama ", 
       "Mikiyase Tesfayohanes ", 
       "Tsigereda Birehane ", 
       "Bereket Kenedenew ", 
       "Mohamed ALI ", 
       "Demkisa Sinebto ", 
       "Derese Demisie ", 
       "Tamerate Ayele ", 
       "Nigusu Mengestu ", 
       "Belaye Bassa ", 
        "Berket Tilahun", 
        "Mizane G/meskel", 
        "Dawit Gemechu", 
        "Ephrem Amakelew", 
        "Getahun Fikra "
    ]
    
    let splitedNames = employee.map(emp=>(
        Object.assign({},emp.split(' '))
    ))
    // console.log(splitedNames)
    let firstName = splitedNames.map(sp=>(
        sp['0']
    ))
    let middleName = splitedNames.map(sp=>(
        sp['1']
    ))
    let lastName = splitedNames.map(sp=>(
        sp['2']
    ))
    return lastName
}
export default function Names() {
    return (
        <div>
            <ul>
                {
                    SplitNames().map(fn=>(
                        <li>
                            {fn===''?'NULL':fn}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}