<template>
	<body style="background-color:rgb(219, 255, 228)">
	<div class="searchtreepage">
		<h1><label>Tree Database</label></h1>
		<br >
		<br />
		<label>You may filter Tree Family first -> then filter Tree Species to narrow down the list of selectable Tree Name</label>
		<br >
		<br />
		<label for="tree_family_option_id">Tree Family : </label>
		<select v-model="tree_family_option_selected" id = tree_family_option_id > 
			<option v-for="option in selectable_tree_family_options" :value="option.value"> {{ option.text }}</option>
		</select>
		<label for="tree_species_option_id">Tree Genus : </label>
		<select v-model="tree_species_option_selected" id = tree_species_option_id> 
			<option v-for="option in selectable_tree_species_options" :value="option.value"> {{ option.text }}</option>
		</select>
		<br >
		<br />
		<label for="tree_name_option_id">Tree Name : </label>
		<select v-model="tree_name_option_selected" id = tree_name_option_id >
			<option v-for="option in selectable_tree_name_options" :value="option.value"> {{option.text }}</option>
		</select>
		<input type='button' value='View Information' @click='download_tree_information(tree_name_option_selected)'>
		<br >
		<br />
		<table border='1' width='100%' style='border-collapse: collapse' >
			<tr pre style="text-align:left" style="height:30px">
				<th  width="15%">Information</th>
				<th  width="15%">Tree</th>
			</tr>
			<td width="15%">
				<tr style="height:30px;text-align:left">Chinese Name</tr>
				
				<tr style="height:30px;text-align:left">English Name</tr>
				
				<tr style="height:30px;text-align:left">Scientific Name</tr>
				
				<tr style="height:30px;text-align:left">Family Name</tr>
				
				<tr style="height:30px;text-align:left">Genus Name</tr>
				
				<tr style="height:30px;text-align:left">Description</tr>
				
				<tr style="height:30px;text-align:left">Image</tr>
			</td>
			<td  width="85%" >
				<tr style="height:30px;text-align:left">{{ this.tree_information_chinese_name }}</tr>			
				<tr style="height:30px;text-align:left" >{{ this.tree_information_english_name }}</tr>
				<tr style="height:30px;text-align:left" >{{ this.tree_scientificname }}</tr>
				<tr style="height:30px;text-align:left" >{{this.tree_family }}</tr>
				<tr style="height:30px;text-align:left" >{{ this.tree_genus }}</tr>		
				<tr style="height:30px;text-align:left" >{{ this.tree_description }}</tr>
				<tr  style="height:30px;text-align:left" >
					<td ><img :src="'../assets/image_files/'+tree_image_path_1" ></td>    
				</tr>				
				<tr  style="height:30px;text-align:left" >
					<td ><img :src="'../assets/image_files/'+tree_image_path_2" ></td>    
				</tr>
				<tr  style="height:30px;text-align:left" >
					<td ><img :src="'../assets/image_files/'+tree_image_path_3"></td>    
				</tr>
				<tr  style="height:30px;text-align:left" >
					<td ><img :src="'../assets/image_files/'+tree_image_path_4" ></td>    
				</tr>
				<tr  style="height:30px;text-align:left" >
					<td ><img :src="'../assets/image_files/'+tree_image_path_5" ></td>    
				</tr>
			</td>
			
		</table>
		  <v-select :options="searchoptions"></v-select>
	</div>
	</body>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', VueSelect.VueSelect)
export default {
	
	props:['data'],
	
	data() {
	    return {
			searchoptions: [
				'foo',
				'bar',
				'baz'
			],
			tree_information_chinese_name:this.tree_information_chinese_name,
			tree_information_english_name:this.tree_information_english_name,
			tree_scientificname:this.tree_scientificname,
			tree_family:this.tree_family,
			tree_genus:this.tree_genus,
			tree_description:this.tree_description,

			tree_images:this.tree_images,
			Name_Chinese:'',
			Name_English:'',
			Scientificname:'',
			Family: '',
			Genus: '',
			Description: '',
	        individual_image_path:'',
			tree_family_option_selected: 'All',
			selectable_tree_family_options: [
		  		{ text: 'All', value: 'All' },
				{ text: 'Aceraceae', value: 'Aceraceae' },
				{ text: 'Caesalpiniaceae', value: 'Caesalpiniaceae' },
				{ text: 'Elaeocarpaceae', value: 'Elaeocarpaceae' },
				{ text: 'Ericaceae', value: 'Ericaceae' },
				{ text: 'Euphorbiaceae', value: 'Euphorbiaceae' },
				{ text: 'Lauraceae', value: 'Lauraceae' },
				{ text: 'Moraceae', value: 'Moraceae' },
				{ text: 'Myrsinaceae', value: 'Myrsinaceae' },
				{ text: 'Rosaceae', value: 'Rosaceae' },
				{ text: 'Sapotaceae', value: 'Sapotaceae' },
				{ text: 'Ulmaceae', value: 'Ulmaceae' }
			],
	
			tree_species_option_selected: 'All',
			selectable_tree_species_options: [
				{ text: 'All', value: 'All' },  
				{ text: 'Acer', value: 'Acer' },
				{ text: 'Ardisia', value: 'Ardisia' },
				{ text: 'Bauhinia', value: 'Bauhinia' },
				{ text: 'Celtis', value: 'Celtis' },
				{ text: 'Elaeocarpus', value: 'Elaeocarpus' },
				{ text: 'Eriobotrya', value: 'Eriobotrya' },
				{ text: 'Ficus', value: 'Ficus' },
				{ text: 'Litsea', value: 'Litsea' },
				{ text: 'Mallotus', value: 'Mallotus' },
				{ text: 'Manilkara', value: 'Manilkara' },
				{ text: 'Neolitsea', value: 'Neolitsea' },
				{ text: 'Persea', value: 'Persea' },
				{ text: 'Rhododendron', value: 'Rhododendron' },
				{ text: 'Sarcosperma', value: 'Sarcosperma' }
			],
			
			tree_name_option_selected: 'All',
			selectable_tree_name_options: [
				{ text: 'All', value: 'All' },  
				{ text: 'Big-leaved Fig', value: 'Big-leaved Fig' },
				{ text: 'Sapodilla', value: 'Sapodilla' },
				{ text: 'Oblong-leaved Mallotus', value: 'Oblong-leaved Mallotus' },
				{ text: 'Wild Loquat', value: 'Wild Loquat' },
				{ text: 'Hainan Elaeocarpus', value: 'Hainan Elaeocarpus' },
				{ text: 'Fragrant Litsea', value: 'Fragrant Litsea' },
				{ text: 'Hance_s Ardisia', value: 'Hance_s Ardisia' },
				{ text: 'Avocado', value: 'Avocado' },
				{ text: 'Hong Kong Neolitsea', value: 'Hong Kong Neolitsea' },
				{ text: 'India-rubber tree', value: 'India-rubber tree' },
				{ text: 'Chinese Hackberry', value: 'Chinese Hackberry' },
				{ text: 'Fleshy Nut Tree', value: 'Fleshy Nut Tree' },
				{ text: 'Long-leaved Maple', value: 'Long-leaved Maple' },
				{ text: 'Rhododendron', value: 'Rhododendron' },
				{ text: 'Camels Foot Tree', value: 'Camels Foot Tree' },
			],

		}
	},
	methods : {
		
		download_tree_information: function(tree_name){
					
		  //  console.log('tree_name:' + tree_name_selected); 
		  //  axios.get('ajaxfile_get_treeinformation.php', {
		//			params: {
		//				tree_name: tree_name_selected ,
		//			}
		//	}).then((response) => {
		//		this.tree_information = response.data;
		//		console.log(response.data);
		///	}).catch((error) => {
		//		console.log(error);
		//	});
		console.log("tree name selected:" + tree_name);
		if (tree_name == "Big-leaved Fig") {
			this.tree_information_chinese_name= '大葉榕/黃葛樹';
			this.tree_information_english_name= 'Ficus virens Aiton';
			this.tree_scientificname = 'Big-leaved Fig';
			this.tree_family= 'Moraceae';
			this.tree_genus= 'Ficus';
			this.tree_description= 'It is a medium-sized tree which grows to a height of 24–27 metres (79–89 ft) In dry areas and up to 32 metres (105 ft) tall in wetter areas. It is a fig tree belonging to the group of trees known as strangler figs';
			this.tree_image_path_1='1/1.png';
			this.tree_image_path_2='1/2.png';
			this.tree_image_path_3='1/3.png';
			this.tree_image_path_4='1/4.png';
			this.tree_image_path_5='';
			
		} else if (tree_name == "Sapodilla") {	
			this.tree_information_chinese_name= '人心果';
			this.tree_information_english_name= 'Manilkara zapota';
			this.tree_scientificname = 'Sapodilla';
			this.tree_family= 'Saptaceae';
			this.tree_genus= 'Manilkara';
			this.tree_description= 'Manilkara zapota  sapota  commonly known as sapodilla';
			this.tree_image_path_1='2/1.png';
			this.tree_image_path_2='2/2.png';
			this.tree_image_path_3='2/3.png';
			this.tree_image_path_4='2/4.png';
			this.tree_image_path_5='2/5.png';
		} else if (tree_name == "Oblong-leaved Mallotus") {			
			this.tree_information_chinese_name= '山苦茶';
			this.tree_information_english_name= 'Mallotus peltatus';
			this.tree_scientificname = 'Oblong-leaved Mallotus';
			this.tree_family= 'Euphorbiaceae';
			this.tree_genus= 'Mallotus';
			this.tree_description= 'To Be Provided';
			this.tree_image_path_1='3/1.png';
			this.tree_image_path_2='3/2.png';
			this.tree_image_path_3='3/3.png';
			this.tree_image_path_4='3/4.png';
			this.tree_image_path_5='3/5.png';
		} else if (tree_name == "Wild Loquat") {			
			this.tree_information_chinese_name= '山枇杷';
			this.tree_information_english_name= 'Eriobotrya fragrans Champ. ex Benth';
			this.tree_scientificname = 'Wild Loquat';
			this.tree_family= 'Rosaceae';
			this.tree_genus= 'Eriobotrya';
			this.tree_description= 'Eriobotrya is a genus of flowering plants ,mostly large evergreen shrubs and small trees in the family Rosaceae';
			this.tree_image_path_1='';
			this.tree_image_path_2='';
			this.tree_image_path_3='';
			this.tree_image_path_4='';
			this.tree_image_path_5='';
		} else if (tree_name == "Hainan Elaeocarpus") {			
			this.tree_information_chinese_name= '水石榕';
			this.tree_information_english_name= 'Elaeocarpus hainanensis Oliv.';
			this.tree_scientificname = 'Hainan Elaeocarpus';
			this.tree_family= 'Elaeocarpaceae';
			this.tree_genus= 'Elaeocarpus ';
			this.tree_description= 'To Be Provided';
			this.tree_image_path_1='';
			this.tree_image_path_2='';
			this.tree_image_path_3='';
			this.tree_image_path_4='';
			this.tree_image_path_5='';
		} else if (tree_name == "Fragrant Litsea") {			
			
			this.tree_information_chinese_name= '山蒼樹';
			this.tree_information_english_name= 'Litsea cubeba (Lour.) Pers.';
			this.tree_scientificname = 'Fragrant Litsea';
			this.tree_family= 'Lauraceae';
			this.tree_genus= 'Litsea';
			this.tree_description= 'To Be Provided';
			this.tree_image_path_1='';
			this.tree_image_path_2='';
			this.tree_image_path_3='';
			this.tree_image_path_4='';
			this.tree_image_path_5='';
		} else if (tree_name == "Hance_s Ardisia") {				
			this.tree_information_chinese_name= '郎傘樹';
			this.tree_information_english_name= 'Ardisia hanceana';
			this.tree_scientificname = 'Hance_s Ardisia';
			this.tree_family= 'Myrsinaceae';
			this.tree_genus= 'Ardisia';
			this.tree_description= '大羅傘樹，Ardisia hanceana Mez，生長在海拔430-1500米的山谷、山坡林下，蔭濕的地方。主要分布安徽、浙江、江西、福建、湖南、廣西、廣東。';
			this.tree_image_path_1='7/1.png';
			this.tree_image_path_2='7/2.png';
			this.tree_image_path_3='7/3.png';
			this.tree_image_path_4='7/4.png';
			this.tree_image_path_5='7/5.png';
		} else if (tree_name == "Avocado") {				
			this.tree_information_chinese_name= '牛油果';
			this.tree_information_english_name= 'Persea americana Mill.';
			this.tree_scientificname = 'Avocado';
			this.tree_family= 'Lauraceae';
			this.tree_genus= 'Persea';
			this.tree_description= 'To Be Provided';
			this.tree_image_path_1='';
			this.tree_image_path_2='';
			this.tree_image_path_3='';
			this.tree_image_path_4='';
			this.tree_image_path_5='';
		} else if (tree_name == "Hong Kong Neolitsea") {				
			this.tree_information_chinese_name= '香港新木薑子';
			this.tree_information_english_name= 'Neolitsea cambodiana var. glabra';
			this.tree_scientificname = 'Hong Kong Neolitsea';
			this.tree_family= 'Lauraceae';
			this.tree_genus= 'Neolitsea';
			this.tree_description= 'To Be Provided';
			this.tree_image_path_1='';
			this.tree_image_path_2='';
			this.tree_image_path_3='';
			this.tree_image_path_4='';
			this.tree_image_path_5='';
		} else if (tree_name == "India-rubber tree") {				
			this.tree_information_chinese_name= '印度榕 ';
			this.tree_information_english_name= 'Ficus elastica';
			this.tree_scientificname = 'India-rubber tree';
			this.tree_family= 'Moraceae';
			this.tree_genus= 'Ficus';
			this.tree_description= 'To Be Provided';
			this.tree_image_path_1='';
			this.tree_image_path_2='';
			this.tree_image_path_3='';
			this.tree_image_path_4='';
			this.tree_image_path_5='';
		} else if (tree_name == "Chinese Hackberry") {				
			this.tree_information_chinese_name= '朴樹 ';
			this.tree_information_english_name= 'Celtis sinensis Pers.';
			this.tree_scientificname = 'Chinese Hackberry';
			this.tree_family= 'Ulmaceae';
			this.tree_genus= 'Celtis';
			this.tree_description= 'To Be Provided';
			this.tree_image_path_1='';
			this.tree_image_path_2='';
			this.tree_image_path_3='';
			this.tree_image_path_4='';
			this.tree_image_path_5='';
		} else if (tree_name == "Fleshy Nut Tree") {				
			this.tree_information_chinese_name= '肉實樹';
			this.tree_information_english_name= 'Sarcosperma laurinum';
			this.tree_scientificname = 'Fleshy Nut Tree';
			this.tree_family= 'Sapotaceae';
			this.tree_genus= 'Sarcosperma';
			this.tree_description= 'To Be Provided';
			this.tree_image_path_1='';
			this.tree_image_path_2='';
			this.tree_image_path_3='';
			this.tree_image_path_4='';
			this.tree_image_path_5='';
		} else if (tree_name == "Long-leaved Maple") {				
			this.tree_information_chinese_name= '長葉槭';
			this.tree_information_english_name= 'Acer reticulatum ';
			this.tree_scientificname = 'Long-leaved Maple';
			this.tree_family= 'Aceraceae';
			this.tree_genus= 'Acer';
			this.tree_description= 'To Be Provided';
			this.tree_image_path_1='';
			this.tree_image_path_2='';
			this.tree_image_path_3='';
			this.tree_image_path_4='';
			this.tree_image_path_5='';
		} else if (tree_name == "Rhododendron") {				
			this.tree_information_chinese_name= '香港杜鵑';
			this.tree_information_english_name= 'Verbenaceae';
			this.tree_scientificname = 'Rhododendron';
			this.tree_family= 'Ericaceae ';
			this.tree_genus= 'Rhododendron';
			this.tree_description= 'To Be Provided';
			this.tree_image_path_1='';
			this.tree_image_path_2='';
			this.tree_image_path_3='';
			this.tree_image_path_4='';
			this.tree_image_path_5='';
		} else if (tree_name == "Camels Foot Tree") {				
			this.tree_information_chinese_name= '宮粉羊蹄甲';
			this.tree_information_english_name= 'Bauhinia variegata';
			this.tree_scientificname = 'Camels Foot Tree';
			this.tree_family= 'Caesalpiniaceae';
			this.tree_genus= 'Bauhinia';
			this.tree_description= 'To Be Provided';
			this.tree_image_path_1='';
			this.tree_image_path_2='';
			this.tree_image_path_3='';
			this.tree_image_path_4='';
			this.tree_image_path_5='';


			
		}
		},
		
		download_tree_image: function(tree_name_selected){
					
		 //   console.log('tree_name:' + tree_name_selected); 
		//    axios.get('ajaxfile_get_tree_image.php', {
		//			params: {
		//				tree_name: tree_name_selected ,
		//			}
		//	}).then((response) => {
		//		this.tree_images = response.data;
		//		console.log(response.data);
		//	}).catch((error) => {
		//		console.log(error);
		//	});
		//},
		
		},
	}
}
</script>


<!-- use the latest vue-select release -->


<style>
</style>
