// Named Imports.
import React, { useEffect } from 'react' 
import { useDispatch } from 'react-redux' 
import { fetchUser } from '../../features/user/userThunks' 

// Default import.
import useUserSelectors from '../../features/user/useUserSelectors' 

export default function Home() {

    const dispatch = useDispatch()
    const { userInfo, status, error } = useUserSelectors()

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUser())
        }
    }, [dispatch, status])

    return (
        <div className='grid-12'>
            <section className='grid-2-2'>
                <h2>Welcome to Django React Full Stack Web App</h2>
                <br />
                {status === 'loading' && <h3>Loading...</h3>}
                {status === 'succeeded' && <h3>{userInfo.username} {userInfo.email}</h3>}
                {error && <h3>{error}</h3>}
                <br />
                <section>
                    <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, veniam!</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                    </p>
                </section>
                <br />
                <section>
                    <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, veniam!</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem ratione voluptates similique ut neque temporibus aliquid consequuntur minima laboriosam quidem, a rerum dolores tempora consectetur, illo, quam obcaecati? Tempora!
                    </p>
                </section>
            </section>
        </div>
    )
}
