import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { redirect } from "next/dist/server/api-utils"
import { format } from "date-fns"
import firebase from '../../services/firebaseConnection'
import styles from './task.module.scss'
import Head from 'next/head'
import { FiCalendar } from 'react-icons/fi'



type Task = {
    id: string;
    created : string | Date;
    createdFormated?: string;
    tarefa: string;
    userId: string;
    name: string; 
}

interface TaskListProps{
 data : string
}

export default function Task({data} : TaskListProps){
    const task = JSON.parse(data) as Task
    

    return(
       <>
        <Head>
            <title>Detalhe da Tarefa</title>
        </Head>
        <article className={styles.container}>
            <div className={styles.actions}>
                <div>
                    <FiCalendar size={30} color='#FFB800'/>
                    <span>Data de criação : </span>
                    <time>{task.createdFormated}</time>
                    
                </div>
            </div>

            <p>{task.tarefa}</p>
        </article>


       
       </>


    )   
}




export const getServerSideProps : GetServerSideProps = async ({req, params}) => {

    const { id } = params;
    const session = await getSession({ req })

    if(!session?.vip ){
        return{
            redirect:{
                destination: '/board',
                permanent: false
            }
        }
    }

    
    const data = await firebase.firestore().collection('tarefas')
    .doc(String(id))
    .get()
    .then(snapshot => {

        const data = {
            id: snapshot.id,
            created: snapshot.data().created,
            createdFormated: format(snapshot.data().created.toDate(), 'dd MMMM yyyy'),
            tarefa: snapshot.data().tarefa,
            userId : snapshot.data().userId,
            name: snapshot.data().nome
        }


        return JSON.stringify(data)
    })
    .catch( () => {
        return {};
    })
    
    if(Object.keys(data).length === 0){
        return{
            redirect:{
                destination: '/board',
                permanent: false
            }
        }
    }
   
    return{
        props: {
            data
        }
    }

}