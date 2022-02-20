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
			<td  width="85%" v-for='(individual_tree_information, index) in tree_information'>
				<tr style="height:30px;text-align:left">{{ individual_tree_information.Name_Chinese }}</tr>
			
				<tr style="height:30px;text-align:left" >{{ individual_tree_information.Name_English }}</tr>
				
				<tr style="height:30px;text-align:left" >{{ individual_tree_information.ScientificName }}</tr>
				
				<tr style="height:30px;text-align:left" >{{ individual_tree_information.Family }}</tr>
				
				<tr style="height:30px;text-align:left" >{{ individual_tree_information.Genus }}</tr>
			
			    <tr style="height:30px;text-align:left" >{{ individual_tree_information.Description }}</tr>
				
				<tr  style="height:30px;text-align:left" v-for='(tree_image_path, index) in tree_images'>
					<td ><img :src="'../assets/image_files/'+tree_image_path.Image_Path" :alt="tree_image_path.Image_Path"></td>
				          
				</tr>
			</td>
			
		</table>
		
	</div>
	</body>
</template>

<script>
import axios from 'axios';
export default {
	
	props:['data'],
	
	data() {
	    return {
			tree_information:this.tree_information,
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
		
		download_tree_information: function(tree_name_selected){
					
		    console.log('tree_name:' + tree_name_selected); 
		    axios.get('ajaxfile_get_treeinformation.php', {
					params: {
						tree_name: tree_name_selected ,
					}
			}).then((response) => {
				this.tree_information = response.data;
				console.log(response.data);
			}).catch((error) => {
				console.log(error);
			});
			
			this.download_tree_image(tree_name_selected)
		},
		
		download_tree_image: function(tree_name_selected){
					
		    console.log('tree_name:' + tree_name_selected); 
		    axios.get('ajaxfile_get_tree_image.php', {
					params: {
						tree_name: tree_name_selected ,
					}
			}).then((response) => {
				this.tree_images = response.data;
				console.log(response.data);
			}).catch((error) => {
				console.log(error);
			});
		},
		
	}
}
</script>

<style>
</style>
