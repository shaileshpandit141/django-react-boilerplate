// Named Imports.
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userThunk, useUserSelectors } from '../../features/user'


export default function Home() {

    const dispatch = useDispatch()
    const { status, data, error } = useUserSelectors()

    useEffect(() => {
        if (status === "idle") {
            dispatch(userThunk())
        }
    }, [dispatch, status])

    return (
        <section className='inner-grid-2-2'>
            <h2>Welcome to Django React Full Stack Web App</h2>
            <br />
            {status === 'loading' && <h3>Loading...</h3>}
            {status === 'succeeded' && <h3>{data?.username} {data?.email}</h3>}
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
    )
}
