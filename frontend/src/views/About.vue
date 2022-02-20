

<template>

  <div class="about" :style="myStyle" >
  
		<pre style="text-align:left;">
		<H2>Who we are:</H2> 
		<H4> CarStartTin Group is a registered non-profit organisation under Hong Kong Companies Ordinance. 
		The objective of our mission is to collect tree information in Hong kong for environment protection 
		purposes. All information will only use for academic research, tree database establishment for 
		non-commerical usage, and important reference for local goverment society planning. </H4>
		<H2>Contact Information:</H2>
		<H4> 
		Principal Office: HKU Space Center, Admirality, Hong Kong
		Email: <a>carlson@students.plymouth.ac.uk</a>
		       <a>timmok@students.plymouth.ac.uk</a>
		       <a>star@students.plymouth.ac.uk</a>
		     
		Telephone no: 23345667
		Fax no: 23456567
		office hour: 9:00am - 6:00pm Mon-Fri
		</H4> 
		<H2>Privacy Information Collection Policy:</H2>
		<H4> 
		Our data collecton policy must be fully compliant with The Personal Data (Privacy) Ordinance and Hong Kong Company Ordinance
		. Pleaes refer to :
		<a href="url">https://www.elegislation.gov.hk/hk/cap486!en-zh-Hant-HK.pdf?FROMCAPINDEX=YP</a> 
		
		By all means, your private information is always duly protected.
		</H4> 
		<H2>Rules of use of our web site/mobile application:</H2>
		<H4>
		In order to minimize the possbility of survey case being rejected,
		
		<mark>Please Don't:</mark>
		
		1. input irrelevant information which will be removed without notice in advance.
		
		2. repeatly input same tree information.
		
		3. input the information that you are not fully confirmed (i.e. tree name) or is lack of supporting evidence.
		
		4. abuse of our property (i.e. data, software, rights granted to you) for other purposes.
		
		<mark>Please Do:</mark>
		
		1. ensure all information is accurate and relevant.
		
		2. submit your draft as a final version as soon as possible. Draft which stores in the database over 1 year 
		   will be erased or rejected without notice in advance.
		   
		3. provide sufficient information as much as possible for our professional judgement especially 
		   the genue of tree is very rare or it is in a danger situation (i.e. likely to collapse shortly 
		   on a pedestrian).
		   
		4. avoid these characters likes "'", ".", "/", "--", "?", "#", "$", "*", "!". They will be removed in 
		   your data when submitting.
		
		5. contact us when you encounter any difficulties
		</H4>
		<H2>Life Cycle of your survey data collection:</H2>
		<H4>
		1. save your data (by pressin "save" button) as a draft 
		   or submit it (by pressing "submit" button)as a final version for moderator's approval;
		   
		2. a draft can be amended many times before sumbitting your data;
		
		3. a moderator is assigned to examine each survey case. Normally, it takes 3 months to complete
		 the whole process;
		
		4. The status of your survey will be:
		   a. Draft
		   b. Submitted
		   c. Pending Approval
		   d. Approved
		   e. Rejected
		   f. Published
		
		you will be notified by email when a survey case changes status. Our moderators may not provide a reason 
		for rejected survey at their discretion.
		
		5. Only approved survey can be published in public. 
		
		6. Obsolete draft (i.e. over more than 1 year old) or improper content in a survey will be removed without 
		   notification. We have the final rights to handle your data after a survey is submitted.
		   
		7. All data will only be kept for 7 years.
		</H4>  
		 
		<H2>Guilelines and Technical constraints</H2>
		<H4>
		
		Recommended broswers:
		Microsoft Edge (Version 90 or above)
		Google Chrome (Version 90 or above)
		Apple iOS Safari 10 or above
		
		Please install this app on your computer or mobile device to maximize user experience.
		
		1. We only accept 5 images file in png format. The size cannot be large than 500K for each.
		
		2. Video image size should be within 10M. Please adjust your vieo resolution or video length accordingly.
		   Otherwise, please submit a link.
		   
		3. Google Map is recommended as a reference to locate a tree position. Longitude and latitude should be precised to
		   8 deciminal points.
		
		4. Please specific your own reference code (client side reference) on each survey case. It is important for us and user to refer to same 
		   reference for indicating which case we are talking about.
		   
		5. When creating a new survey, new survey ID must be assigend and your reference should shown on the survey list table.
		   Otherwise, it is regarded failed submission. Please resubmit it.
		   
		6. Please contact your IT administrator to ensure there is no firewall blocking on this App.
		
		7. Don't download more than 300 survey records in one time.
		</H4>
		<H2>Known Issues in the Apps</H2>
		<H4>
		1. Survey Record List cannot be fully displayed on some brand name of android phone. 
		
		2. Filter is not workable when filters over 300 records.
		</H4>
		
		<H2>Future Development</H2>
		<H4>
		1. Sorting includes client reference, location, survey status, etc. in the survey list table.
		
		2. Tree location information can be automatically filled by calling Google Map function.
		
		3. Guildline can be specified by a link on each input box or button
		
		4. A list of all published survey report can be downloaded or accesable on the App.
		
		5. Notification pushed from the to inform a user that there is a change on survey status.
		
		6. Font format, UI layout and arrangement, color will be fine tunted to make it more attractive and professional.
		</H4>
		<H2>Reference: Tree Database Information</H2>
		<H4>
		 Image and Text is sourced from
		 http://www.hktree.com/tree/Ficus%20virens.htm
		 http://www.hktree.com/tree/Mallotus%20peltatus.htm
		 http://www.hktree.com/tree/Elaeocarpus%20hainanensis1.htm
		 http://www.hktree.com/tree/Manilkara%20achras.htm
		 
		 Text is sourced from
		 http://www.hktree.com/tree/
		 https://en.wikipedia.org/wiki/Ficus_virens
		 https://dbpedia.org/page/Manilkara_zapota
		 https://en.wikipedia.org/wiki/Eriobotrya
		 https://www.easyatm.com.tw/wiki/%E5%A4%A7%E7%BE%85%E5%82%98%E6%A8%B9
		 
		 Much appreciated if you spot any mistake and inform us as soon as possible.
		</H4> 
		
		</pre>
		

	
  </div>

	
</template>
<script>
	
export default {

	data(){
		return{
			myStyle:{
				backgroundColor:"rgb(255, 255, 170)" 
			},
		}
	}
}
</script>




