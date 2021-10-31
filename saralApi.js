const axios=require('axios')
const input=require('prompt-sync')()
async function getreq(){
    let res=await axios.get('http://api.navgurukul.org/courses')
    let data0=res.data
    // console.log(data);
    var c=1
    for (let i of data0){
        console.log(`${c}. ${i.name}`);
        c++
    }
    console.log('\n\n\n');
    var cours=input('Enter course no.  : ')
    var id =data0[cours-1].id
    console.log(id);
    
    let res1=await axios.get(`http://saral.navgurukul.org/api/courses/${id}/exercises`)
    let data1=res1.data
    // console.log(data1);
    var slugg={}

    var co=1;
    for (let a of data1.data){
        // console.log(a);
        console.log(`${co}. ${a.name}`);
        // console.log(a.childExercises);
        if (a.childExercises.length!=0){
            let v=1
            for (let y of a.childExercises){
                console.log(`${co}.${v} ${y.name}`);
                v++;
                slugg[`${co}.${v}`]=y.name
            }
            // console.log(a.childExercises.name);
        }
        slugg[co]=a.slug
        co++
        
    }console.log(slugg);
    var qus=input('entr the question no. : ')

    let res2= await axios.get(`http://saral.navgurukul.org/api/courses/${id}/exercise/getBySlug?slug=${slugg[qus]}`)
    let data2=res2.data
    // console.log(data2);
    const data3=JSON.parse(data2["content"])
    // console.log(data3);
    const data4=JSON.parse(data3[0])
    // console.log(data4["content"]);
    console.log(data4["value"]);

}


getreq()
