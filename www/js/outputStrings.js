
var xmlDocStrings;      //contiene il file con le stringhe
var langTextToSpeech;	//salva la lingua per il text to speech

var point_duration = 400;	//durata (in millisecondi) della vibrazione per la codifica del punto. 
var line_duration = 800;	//durata (in millisecondi) della vibrazione per la codifica della linea. 


function open_xml_strings() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "text/text.xml", false);
    xhttp.send();
    xmlDocStrings = xhttp.responseXML;
    langTextToSpeech = 'it-IT';
    navigate_initial_menu();
}

function get_value_from_xml(param) {	//per prendere il valore adatto da un file xml
    var x = xmlDocStrings.getElementsByTagName(param);
    return x[0].getAttribute("value");
}

function set_output_strings(str1, str2, str3, str4) { //si settano le stringhe da stampare nella homepage
	var statusdivHome = document.getElementById('statusdivHome');
    statusdivHome.innerHTML = '' + str1;
	var statusdivUp = document.getElementById('statusdivUp');
    statusdivUp.innerHTML = '' + str2;
	var statusdivEnter = document.getElementById('statusdivEnter');
    statusdivEnter.innerHTML = '' + str3;
	var statusdivDown = document.getElementById('statusdivDown');
    statusdivDown.innerHTML = '' + str4;
}

function set_output(textToPrint, textTutorial) {	//si manda la stringa giusta da mandare in output
	
	//alert(textToPrint);
	TTS.speak({text:textTutorial, locale: langTextToSpeech});	
}

function pushing_button(button) {
	//vibrazione di default che scatta ogni volta che viene premuto un tasto
	
	if(button == 'home') {			//home
		navigator.vibrate(line_duration);	//linea
	}		
	else if(button == 'up') {		//up
		navigator.vibrate(line_duration);	//linea - punto
		sleep(line_duration + 500);
		navigator.vibrate(point_duration);
	}
	else if(button == 'enter') {	//enter
		navigator.vibrate(point_duration);	//punto
	}
	else {							//down
		navigator.vibrate(point_duration);	//punto - linea
		sleep(point_duration + 500);
		navigator.vibrate(line_duration);	
	}	
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}



/************************** MENU INIZIALE ****************************/

function navigate_initial_menu() {
	
	var current_xmlEnter = get_value_from_xml('enter');	//stato attuale della temperatura
	var update_xmlTemp = translate_menu(counter_menu);			//e valore provvisorio da confermare nel caso
	var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
	
    var back_xmlTemp = get_value_from_xml('exit');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_menu+1) >= counter_voci_menu){
        var up_bottom= get_value_from_xml('no_voci');
    }
    else{
        var up_bottom= translate_menu(counter_menu+1);
    }
    
    if ((counter_menu-1) < 0){
        var down_bottom= get_value_from_xml('no_voci');
    }
    else{
        var down_bottom= translate_menu(counter_menu-1);
    }
	
	set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);	
}

function translate_menu(counter_current){
    
    var return_string_xml;
    
    if(counter_current==0)
        return_string_xml=get_value_from_xml('bn_accessibile');
    else if(counter_current==1)
        return_string_xml=get_value_from_xml('descrizione_evento');
    else if(counter_current==2)
        return_string_xml=get_value_from_xml('contesa');
    else if(counter_current==3)
        return_string_xml=get_value_from_xml('programma');
    else if(counter_current==4)
        return_string_xml=get_value_from_xml('gruppi_storici');
    else if(counter_current==5)
        return_string_xml=get_value_from_xml('gruppi_musicali');
    
    return return_string_xml;
}

/************************** CONTESA DI SANT'ELIANO ****************************/

function navigate_string_contesa() {
    
    var current_xmlEnter = get_value_from_xml('enter');	//stato attuale della temperatura
    var update_xmlTemp = translate_contesa(counter_banchi);			//e valore provvisorio da confermare nel caso
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('menu');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_banchi+1) >= counter_voci_banchi){
        var up_bottom= get_value_from_xml('no_voci');
    }
    else{
        var up_bottom= translate_contesa(counter_banchi+1);
    }
    
    if ((counter_banchi-1) < 0){
        var down_bottom= get_value_from_xml('no_voci');
    }
    else{
        var down_bottom= translate_contesa(counter_banchi-1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_contesa(current_contesa){
    var return_string_xml;
    if(current_contesa==0)
        return_string_xml=get_value_from_xml('intro_contesa');
    else if(current_contesa==1)
        return_string_xml=get_value_from_xml('banco_scrittura');
    else if(current_contesa==2)
        return_string_xml=get_value_from_xml('banco_tessitura');
    else if(current_contesa==3)
        return_string_xml=get_value_from_xml('banco_arcaio');
    else if(current_contesa==4)
        return_string_xml=get_value_from_xml('banco_funebre');
    else if(current_contesa==5)
        return_string_xml=get_value_from_xml('banco_giochi');
    else if(current_contesa==6)
        return_string_xml=get_value_from_xml('banco_falegname');
    else if(current_contesa==7)
        return_string_xml=get_value_from_xml('banco_conio');
    else if(current_contesa==8)
        return_string_xml=get_value_from_xml('banco_armaiolo');
    else if(current_contesa==9)
        return_string_xml=get_value_from_xml('banco_ingegnere');
    else if(current_contesa==10)
        return_string_xml=get_value_from_xml('banco_speziale');
    else if(current_contesa==11)
        return_string_xml=get_value_from_xml('banco_scudaio');
    else if(current_contesa==12)
        return_string_xml=get_value_from_xml('banco_medico');
    else if(current_contesa==13)
        return_string_xml=get_value_from_xml('banco_birra');
    
    return return_string_xml;
}

function translate_contesa_text(current_contesa){
	var return_string_xml;
    if(current_contesa==0)
        return_string_xml=get_value_from_xml('contesa_text');
    else if(current_contesa==1)
        return_string_xml=get_value_from_xml('banco_scrittura_text');
    else if(current_contesa==2)
        return_string_xml=get_value_from_xml('banco_tessitura_text');
    else if(current_contesa==3)
        return_string_xml=get_value_from_xml('banco_arcaio_text');
    else if(current_contesa==4)
        return_string_xml=get_value_from_xml('banco_funebre_text');
    else if(current_contesa==5)
        return_string_xml=get_value_from_xml('banco_giochi_text');
    else if(current_contesa==6)
        return_string_xml=get_value_from_xml('banco_falegname_text');
    else if(current_contesa==7)
        return_string_xml=get_value_from_xml('banco_conio_text');
    else if(current_contesa==8)
        return_string_xml=get_value_from_xml('banco_armaiolo_text');
    else if(current_contesa==9)
        return_string_xml=get_value_from_xml('banco_ingegnere_text');
    else if(current_contesa==10)
        return_string_xml=get_value_from_xml('banco_speziale_text');
    else if(current_contesa==11)
        return_string_xml=get_value_from_xml('banco_scudaio_text');
    else if(current_contesa==12)
        return_string_xml=get_value_from_xml('banco_medico_text');
    else if(current_contesa==13)
        return_string_xml=get_value_from_xml('banco_birra_text');
    
    return return_string_xml;
}

/************************** GRUPPI STORICI ****************************/

function navigate_string_storici() {
    
    var current_xmlEnter = get_value_from_xml('enter');	//stato attuale della temperatura
    var update_xmlTemp = translate_storico(counter_storici);		//e valore provvisorio da confermare nel caso
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('menu');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_storici+1) >= counter_voci_storici){
        var up_bottom= get_value_from_xml('no_voci');
    }
    else{
        var up_bottom= translate_storico(counter_storici+1);
    }
    
    if ((counter_storici-1) < 0){
        var down_bottom= get_value_from_xml('no_voci');
    }
    else{
        var down_bottom= translate_storico(counter_storici-1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_storico(current_gruppo){
    
    var return_string_xml;
    
    if(current_gruppo==0)
        return_string_xml=get_value_from_xml('fortebraccio');
    else if(current_gruppo==1)
        return_string_xml=get_value_from_xml('fara');
    else if(current_gruppo==2)
        return_string_xml=get_value_from_xml('tempora');
    else if(current_gruppo==3)
        return_string_xml=get_value_from_xml('gens');
    else if(current_gruppo==4)
        return_string_xml=get_value_from_xml('cavalieri');
    
    return return_string_xml;
}

function translate_storico_text(current_gruppo){
    
    var return_string_xml;
    
    if(current_gruppo==0)
        return_string_xml=get_value_from_xml('fortebraccio_text');
    else if(current_gruppo==1)
        return_string_xml=get_value_from_xml('fara_text');
    else if(current_gruppo==2)
        return_string_xml=get_value_from_xml('tempora_text');
    else if(current_gruppo==3)
        return_string_xml=get_value_from_xml('gens_text');
    else if(current_gruppo==4)
        return_string_xml=get_value_from_xml('cavalieri_text');
    
    return return_string_xml;
}

/************************** GRUPPI MUSICALI ****************************/

function navigate_string_musica() {
    
    var current_xmlEnter = get_value_from_xml('enter');	//stato attuale della temperatura
    var update_xmlTemp = translate_musica(counter_musica);		//e valore provvisorio da confermare nel caso
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('menu');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_musica+1) >= counter_voci_musica){
        var up_bottom= get_value_from_xml('no_voci');
    }
    else{
        var up_bottom= translate_musica(counter_musica+1);
    }
    
    if ((counter_musica-1) < 0){
        var down_bottom= get_value_from_xml('no_voci');
    }
    else{
        var down_bottom= translate_musica(counter_musica-1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_musica(current_musica){
    var return_string_xml;
    
    if(current_musica==0)
        return_string_xml=get_value_from_xml('emian');
    else if(current_musica==1)
        return_string_xml=get_value_from_xml('odor');
    
    return return_string_xml;
}

function translate_musica_text(current_musica){
    var return_string_xml;
    
    if(current_musica==0)
        return_string_xml=get_value_from_xml('emian_text');
    else if(current_musica==1)
        return_string_xml=get_value_from_xml('odor_text');
    
    return return_string_xml;
}

/************************** PROGRAMMA ****************************/

function navigate_string_giorni() {
    
    var current_xmlEnter = get_value_from_xml('enter');	
    var update_xmlTemp = translate_giorno(counter_giorni);			
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('menu');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_giorni+1) >= counter_voci_giorni){
        var up_bottom= get_value_from_xml('no_voci');
    }
    else{
        var up_bottom= translate_giorno(counter_giorni+1);
    }
    
    if ((counter_giorni-1) < 0){
        var down_bottom= get_value_from_xml('no_voci');
    }
    else{
        var down_bottom= translate_giorno(counter_giorni-1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_giorno(corrent_day){
	
    var return_string_xml;
	
    if(corrent_day==0)
        return_string_xml=get_value_from_xml('giovedi');
    else if(corrent_day==1)
        return_string_xml=get_value_from_xml('venerdi');
    else if(corrent_day==2)
        return_string_xml=get_value_from_xml('sabato');
    else if(corrent_day==3)
        return_string_xml=get_value_from_xml('domenica');
    
    return return_string_xml;
}

/************************** GIOVEDI ****************************/

function navigate_string_giovedi() {
    
    var current_xmlEnter = get_value_from_xml('enter');	
    var update_xmlTemp = translate_giovedi(counter_orari_giovedi);			
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('programma');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_orari_giovedi+1) >= counter_voci_orari_giovedi){
        var up_bottom= get_value_from_xml('no_voci');
    }
    else{
        var up_bottom= translate_giovedi(counter_orari_giovedi+1);
    }
    
    if ((counter_orari_giovedi-1) < 0){
        var down_bottom= get_value_from_xml('no_voci');
    }
    else{
        var down_bottom= translate_giovedi(counter_orari_giovedi-1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_giovedi(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('diciotto');
    else if(current_time==1)
        return_string_xml=get_value_from_xml('diciotto_mezza');
    else if(current_time==2)
        return_string_xml=get_value_from_xml('diciannove');
    else if(current_time==3)
        return_string_xml=get_value_from_xml('diciannove_mezza');
	else if(current_time==4)
        return_string_xml=get_value_from_xml('venti');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('venti_mezza');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('ventuno');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('ventuno_unquarto');
	else if(current_time==8)
        return_string_xml=get_value_from_xml('ventidue');
	else if(current_time==9)
        return_string_xml=get_value_from_xml('ventidue_mezza');
	else if(current_time==10)
        return_string_xml=get_value_from_xml('ventitre');
	else if(current_time==11)
        return_string_xml=get_value_from_xml('eventi');
    
    return return_string_xml;	
}

function translate_giovedi_text(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('diciotto_cinque');
    else if(current_time==1)
        return_string_xml=get_value_from_xml('diciotto_mezza_cinque');
    else if(current_time==2)
        return_string_xml=get_value_from_xml('diciannove_cinque');
    else if(current_time==3)
        return_string_xml=get_value_from_xml('diciannove_mezza_cinque');
	else if(current_time==4)
        return_string_xml=get_value_from_xml('venti_cinque');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('venti_mezza_cinque');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('ventuno_cinque');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('ventuno_unquarto_cinque');
	else if(current_time==8)
        return_string_xml=get_value_from_xml('ventidue_cinque');
	else if(current_time==9)
        return_string_xml=get_value_from_xml('ventidue_mezza_cinque');
	else if(current_time==10)
        return_string_xml=get_value_from_xml('ventitre_cinque');
	else if(current_time==11)
        return_string_xml=get_value_from_xml('eventi_cinque');
    
    return return_string_xml;	
}

/************************** VENERDI ****************************/

function navigate_string_venerdi() {
    
    var current_xmlEnter = get_value_from_xml('enter');	
    var update_xmlTemp = translate_venerdi(counter_orari_venerdi);			
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('programma');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_orari_venerdi+1) >= counter_voci_orari_venerdi){
        var up_bottom= get_value_from_xml('no_voci');
    }
    else{
        var up_bottom = translate_venerdi(counter_orari_venerdi+1);
    }
    
    if ((counter_orari_venerdi-1) < 0){
        var down_bottom = get_value_from_xml('no_voci');
    }
    else{
        var down_bottom = translate_venerdi(counter_orari_venerdi-1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_venerdi(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('dieci_to_dodici');
	else if(current_time==1)
        return_string_xml=get_value_from_xml('dieci_to_tredici');
    else if(current_time==2)
        return_string_xml=get_value_from_xml('dieci');
    else if(current_time==3)
        return_string_xml=get_value_from_xml('quindici_mezza');
    else if(current_time==4)
        return_string_xml=get_value_from_xml('sedici');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('sedici_unquarto');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('diciasette_to_ventiquattro');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('diciasette');
	else if(current_time==8)
        return_string_xml=get_value_from_xml('diciasette_mezza');
	else if(current_time==9)
        return_string_xml=get_value_from_xml('diciasette_trequarti');
	else if(current_time==10)
        return_string_xml=get_value_from_xml('diciotto');
	else if(current_time==11)
        return_string_xml=get_value_from_xml('diciotto_mezza');
	else if(current_time==12)
        return_string_xml=get_value_from_xml('diciannove_mezza');
	else if(current_time==13)
        return_string_xml=get_value_from_xml('venti');
	else if(current_time==14)
        return_string_xml=get_value_from_xml('venti_mezza');
	else if(current_time==15)
        return_string_xml=get_value_from_xml('ventuno');
	else if(current_time==16)
        return_string_xml=get_value_from_xml('ventuno_unquarto');
	else if(current_time==17)
        return_string_xml=get_value_from_xml('ventidue');
	else if(current_time==18)
        return_string_xml=get_value_from_xml('ventidue_mezza');
	else if(current_time==19)
        return_string_xml=get_value_from_xml('ventitre');
	else if(current_time==20)
        return_string_xml=get_value_from_xml('ventitre_mezza');
	else if(current_time==21)
        return_string_xml=get_value_from_xml('eventi');
    
    return return_string_xml;	
}

function translate_venerdi_text(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('dieci_to_dodici_sei');
	else if(current_time==1)
        return_string_xml=get_value_from_xml('dieci_to_tredici_sei');
    else if(current_time==2)
        return_string_xml=get_value_from_xml('dieci_sei');
    else if(current_time==3)
        return_string_xml=get_value_from_xml('quindici_mezza_sei');
    else if(current_time==4)
        return_string_xml=get_value_from_xml('sedici_sei');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('sedici_unquarto_sei');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('diciasette_to_ventiquattro_sei');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('diciasette_sei');
	else if(current_time==8)
        return_string_xml=get_value_from_xml('diciasette_mezza_sei');
	else if(current_time==9)
        return_string_xml=get_value_from_xml('diciasette_trequarti_sei');
	else if(current_time==10)
        return_string_xml=get_value_from_xml('diciotto_sei');
	else if(current_time==11)
        return_string_xml=get_value_from_xml('diciotto_mezza_sei');
	else if(current_time==12)
        return_string_xml=get_value_from_xml('diciannove_mezza_sei');
	else if(current_time==13)
        return_string_xml=get_value_from_xml('venti_sei');
	else if(current_time==14)
        return_string_xml=get_value_from_xml('venti_mezza_sei');
	else if(current_time==15)
        return_string_xml=get_value_from_xml('ventuno_sei');
	else if(current_time==16)
        return_string_xml=get_value_from_xml('ventuno_unquarto_sei');
	else if(current_time==17)
        return_string_xml=get_value_from_xml('ventidue_sei');
	else if(current_time==18)
        return_string_xml=get_value_from_xml('ventidue_mezza_sei');
	else if(current_time==19)
        return_string_xml=get_value_from_xml('ventitre_sei');
	else if(current_time==20)
        return_string_xml=get_value_from_xml('ventitre_mezza_sei');
	else if(current_time==21)
        return_string_xml=get_value_from_xml('eventi_sei');
    
    return return_string_xml;	
}

/************************** SABATO ****************************/

function navigate_string_sabato() {
    
    var current_xmlEnter = get_value_from_xml('enter');	
    var update_xmlTemp = translate_sabato(counter_orari_sabato);			
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('programma');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_orari_sabato+1) >= counter_voci_orari_sabato){
        var up_bottom= get_value_from_xml('no_voci');
    }
    else{
        var up_bottom = translate_sabato(counter_orari_sabato+1);
    }
    
    if ((counter_orari_sabato-1) < 0){
        var down_bottom = get_value_from_xml('no_voci');
    }
    else{
        var down_bottom = translate_sabato(counter_orari_sabato-1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_sabato(current_time){
	
	var return_string_xml;
	
     if(current_time==0)
        return_string_xml=get_value_from_xml('dieci_to_dodici');
	else if(current_time==1)
        return_string_xml=get_value_from_xml('dieci_to_tredici');
    else if(current_time==2)
        return_string_xml=get_value_from_xml('dieci');
	else if(current_time==3)
        return_string_xml=get_value_from_xml('diciasette_to_ventiquattro');
    else if(current_time==4)
        return_string_xml=get_value_from_xml('diciasette');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('diciasette_mezza');
    else if(current_time==6)
        return_string_xml=get_value_from_xml('diciotto');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('diciotto_mezza');
	else if(current_time==8)
        return_string_xml=get_value_from_xml('diciannove');
	else if(current_time==9)
        return_string_xml=get_value_from_xml('venti');
	else if(current_time==10)
        return_string_xml=get_value_from_xml('venti_mezza');
	else if(current_time==11)
        return_string_xml=get_value_from_xml('ventuno');
	else if(current_time==12)
        return_string_xml=get_value_from_xml('ventuno_unquarto');
	else if(current_time==13)
        return_string_xml=get_value_from_xml('ventidue');
	else if(current_time==14)
        return_string_xml=get_value_from_xml('ventidue_unquarto');
	else if(current_time==15)
        return_string_xml=get_value_from_xml('ventidue_mezza');
	else if(current_time==16)
        return_string_xml=get_value_from_xml('ventidue_trequarti');
	else if(current_time==17)
        return_string_xml=get_value_from_xml('ventitre');
	else if(current_time==18)
        return_string_xml=get_value_from_xml('ventitre_mezza');
	else if(current_time==19)
        return_string_xml=get_value_from_xml('mezza_unquarto');
	else if(current_time==20)
        return_string_xml=get_value_from_xml('mezza_trequarti');
	else if(current_time==21)
        return_string_xml=get_value_from_xml('eventi');
    
    return return_string_xml;	
}

function translate_sabato_text(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('dieci_to_dodici_sette');
	else if(current_time==1)
        return_string_xml=get_value_from_xml('dieci_to_tredici_sette');
    else if(current_time==2)
        return_string_xml=get_value_from_xml('dieci_sette');
	else if(current_time==3)
        return_string_xml=get_value_from_xml('diciasette_to_ventiquattro_sette');
    else if(current_time==4)
        return_string_xml=get_value_from_xml('diciasette_sette');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('diciasette_mezza_sette');
    else if(current_time==6)
        return_string_xml=get_value_from_xml('diciotto_sette');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('diciotto_mezza_sette');
	else if(current_time==8)
        return_string_xml=get_value_from_xml('diciannove_sette');
	else if(current_time==9)
        return_string_xml=get_value_from_xml('venti_sette');
	else if(current_time==10)
        return_string_xml=get_value_from_xml('venti_mezza_sette');
	else if(current_time==11)
        return_string_xml=get_value_from_xml('ventuno_sette');
	else if(current_time==12)
        return_string_xml=get_value_from_xml('ventuno_unquarto_sette');
	else if(current_time==13)
        return_string_xml=get_value_from_xml('ventidue_sette');
	else if(current_time==14)
        return_string_xml=get_value_from_xml('ventidue_unquarto_sette');
	else if(current_time==15)
        return_string_xml=get_value_from_xml('ventidue_mezza_sette');
	else if(current_time==16)
        return_string_xml=get_value_from_xml('ventidue_trequarti_sette');
	else if(current_time==17)
        return_string_xml=get_value_from_xml('ventitre_sette');
	else if(current_time==18)
        return_string_xml=get_value_from_xml('ventitre_mezza_sette');
	else if(current_time==19)
        return_string_xml=get_value_from_xml('mezza_unquarto_sette');
	else if(current_time==20)
        return_string_xml=get_value_from_xml('mezza_trequarti_sette');
	else if(current_time==21)
        return_string_xml=get_value_from_xml('eventi_sette');
    
    return return_string_xml;	
}

/************************** DOMENICA ****************************/

function navigate_string_domenica() {
    
    var current_xmlEnter = get_value_from_xml('enter');	
    var update_xmlTemp = translate_domenica(counter_orari_domenica);			
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('programma');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_orari_domenica + 1) >= counter_voci_orari_domenica){
        var up_bottom= get_value_from_xml('no_voci');
    }
    else{
        var up_bottom = translate_domenica(counter_orari_domenica + 1);
    }
    
    if ((counter_orari_domenica - 1) < 0){
        var down_bottom = get_value_from_xml('no_voci');
    }
    else{
        var down_bottom = translate_domenica(counter_orari_domenica - 1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_domenica(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('dieci_to_dodici');
	else if(current_time==1)
        return_string_xml=get_value_from_xml('dieci_to_tredici');
    else if(current_time==2)
        return_string_xml=get_value_from_xml('dieci');
    else if(current_time==3)
        return_string_xml=get_value_from_xml('dieci_mezza');
    else if(current_time==4)
        return_string_xml=get_value_from_xml('undici');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('undici_mezza');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('dodici_mezza');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('quindici');
	else if(current_time==8)
        return_string_xml=get_value_from_xml('sedici');
	else if(current_time==9)
        return_string_xml=get_value_from_xml('sedici_mezza');
	else if(current_time==10)
        return_string_xml=get_value_from_xml('diciasette_to_ventiquattro');
	else if(current_time==11)
        return_string_xml=get_value_from_xml('diciasette');
	else if(current_time==12)
        return_string_xml=get_value_from_xml('diciasette_mezza');
	else if(current_time==13)
        return_string_xml=get_value_from_xml('diciasette_trequarti');
	else if(current_time==14)
        return_string_xml=get_value_from_xml('diciotto');
	else if(current_time==15)
        return_string_xml=get_value_from_xml('diciotto_trequarti');
	else if(current_time==16)
        return_string_xml=get_value_from_xml('diciannove_mezza');
	else if(current_time==17)
        return_string_xml=get_value_from_xml('diciannove_trequarti');
	else if(current_time==18)
        return_string_xml=get_value_from_xml('venti');
	else if(current_time==19)
        return_string_xml=get_value_from_xml('venti_unquarto');
	else if(current_time==20)
        return_string_xml=get_value_from_xml('venti_mezza');
	else if(current_time==21)
        return_string_xml=get_value_from_xml('ventuno');
	else if(current_time==22)
        return_string_xml=get_value_from_xml('ventuno_mezza');
	else if(current_time==23)
        return_string_xml=get_value_from_xml('ventuno_trequarti');
	else if(current_time==24)
        return_string_xml=get_value_from_xml('ventidue');
	else if(current_time==25)
        return_string_xml=get_value_from_xml('ventidue_mezza');
	else if(current_time==26)
        return_string_xml=get_value_from_xml('ventitre');
	else if(current_time==27)
        return_string_xml=get_value_from_xml('ventitre_mezza');
    
    return return_string_xml;	
}

function translate_domenica_text(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('dieci_to_dodici_otto');
	else if(current_time==1)
        return_string_xml=get_value_from_xml('dieci_to_tredici_otto');
    else if(current_time==2)
        return_string_xml=get_value_from_xml('dieci_otto');
    else if(current_time==3)
        return_string_xml=get_value_from_xml('dieci_mezza_otto');
    else if(current_time==4)
        return_string_xml=get_value_from_xml('undici_otto');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('undici_mezza_otto');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('dodici_mezza_otto');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('quindici_otto');
	else if(current_time==8)
        return_string_xml=get_value_from_xml('sedici_otto');
	else if(current_time==9)
        return_string_xml=get_value_from_xml('sedici_mezza_otto');
	else if(current_time==10)
        return_string_xml=get_value_from_xml('diciasette_to_ventiquattro');
	else if(current_time==11)
        return_string_xml=get_value_from_xml('diciasette_otto');
	else if(current_time==12)
        return_string_xml=get_value_from_xml('diciasette_mezza_otto');
	else if(current_time==13)
        return_string_xml=get_value_from_xml('diciasette_trequarti_otto');
	else if(current_time==14)
        return_string_xml=get_value_from_xml('diciotto_otto');
	else if(current_time==15)
        return_string_xml=get_value_from_xml('diciotto_trequarti_otto');
	else if(current_time==16)
        return_string_xml=get_value_from_xml('diciannove_mezza_otto');
	else if(current_time==17)
        return_string_xml=get_value_from_xml('diciannove_trequarti_otto');
	else if(current_time==18)
        return_string_xml=get_value_from_xml('venti_otto');
	else if(current_time==19)
        return_string_xml=get_value_from_xml('venti_unquarto_otto');
	else if(current_time==20)
        return_string_xml=get_value_from_xml('venti_mezza_otto');
	else if(current_time==21)
        return_string_xml=get_value_from_xml('ventuno_otto');
	else if(current_time==22)
        return_string_xml=get_value_from_xml('ventuno_mezza_otto');
	else if(current_time==23)
        return_string_xml=get_value_from_xml('ventuno_trequarti_otto');
	else if(current_time==24)
        return_string_xml=get_value_from_xml('ventidue_otto');
	else if(current_time==25)
        return_string_xml=get_value_from_xml('ventidue_mezza_otto');
	else if(current_time==26)
        return_string_xml=get_value_from_xml('ventitre_otto');
	else if(current_time==27)
        return_string_xml=get_value_from_xml('ventitre_mezza_otto');
    
    return return_string_xml;	
}