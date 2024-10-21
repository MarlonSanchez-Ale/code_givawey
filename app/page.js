"use client";
import Image from "next/image";
import { useState } from 'react'
import Omw_logo from './assets/images/oldmanwinters_logo.webp'
import PropTypes from 'prop-types'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Confetti from "react-confetti";
import { useSpring, animated } from "react-spring";

const schema = yup.object({
  nombre: yup.string().required("Debe ingresar su nombre completo"),
  telefono: yup.string().matches(/^[0-9]{8}$/, "El número de teléfono debe tener exactamente 8 dígitos, sin espacios ni caracteres especiales").required("Debe ingresar su teléfono"),
  direccion: yup.string().required("Debe ingresar su dirección")
})


export default function Home() {

  const [state, setState] = useState(false)
  const [isConfettiVisible, setConfettiVisible] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    console.log(data)
    setState(!state)

    setConfettiVisible(true);

    // Opcional: esconder el confeti después de algunos segundos
    setTimeout(() => setConfettiVisible(false), 5000);
  }

  const balloonAnimation = useSpring({
    transform: isConfettiVisible ? "translateY(0px)" : "translateY(-500px)",
    opacity: isConfettiVisible ? 1 : 0,
    config: { tension: 180, friction: 12 }
  });


  return (
    <div className="grid grid-cols-1 place-items-center min-h-screen sm:p-10 md:gap-0 md:m-0 font-[family-name:var(--font-geist-sans)] m-0">
      <Image src={Omw_logo} width={200} height={200} alt="Old Man Winters logo" style={{ margin: 0 }} />
      {state ? <CodeGivawey isConfettiVisible={isConfettiVisible} balloonAnimation={balloonAnimation} /> : <Welcome handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} errors={errors} />}
    </div>
  );
}


const Welcome = ({ handleSubmit, onSubmit, register, errors }) => {
  return (
    <>
      <div className='flex flex-col justify-center sm:gap-3 text-center' style={{ margin: 0 }}>
        <h1 className=' text-3xl text-gray-200 font-bold'>¡Disfruta de un 10% de descuento en tu próxima compra!</h1>
        <p className='text-xl text-gray-400 font-light'>Solo ingresa tus datos y accede a la promoción exclusiva.</p>
      </div>
      <form className='flex flex-col justify-center gap-2 sm:mt-5 md:mt-0' onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          id='name'
          placeholder='Nombre completo'
          {...register('nombre')}
          className=' text-white rounded-md shadow-md p-2 bg-black border border-white font-light w-full'
        />
        <p className=" font-light text-red-400">{errors.nombre?.message}</p>
        <input
          type="tel"
          id='name'
          placeholder='Número de teléfono'
          {...register('telefono')}
          className=' text-white rounded-md shadow-md bg-black border border-white p-2 font-light w-full'
        />
        <p className="font-light text-red-400">{errors.telefono?.message}</p>
        <input
          type="text"
          id='name'
          placeholder='Dirección'
          {...register('direccion')}
          className=' text-white rounded-md shadow-md bg-black border border-white p-2 font-light w-full'
        />
        <p className="font-light text-red-400">{errors.correo?.message}</p>
        <button
          type="submit"
          className='bg-rose-600 p-2 shadow-md font-bold rounded-md'
        >
          Obtener Descuento
        </button>
      </form>
    </>
  )
}

Welcome.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,

}


const CodeGivawey = ({ isConfettiVisible, balloonAnimation }) => {
  return (
    <>
      <div className='flex flex-col justify-center gap-4 text-center'>
        <div className='flex flex-col justify-center gap-3'>
          <h1 className=' text-3xl text-gray-200 font-bold'>Que fácil, ¿verdad?</h1>
          <p className='text-xl text-gray-400 font-light'>Mostrá tu código en tienda o en compras en línea</p>

        </div>
        <div className=' bg-black p-10 rounded-md shadow-md'>
          <h2 className='sm:text-4xl lg:text-7xl font-bold text-gray-50'>OMW-25633</h2>
        </div>

        <p className='text-xl text-yellow-300 font-light'>Válido del 21 al 25 de Octubre 2024</p>


        {/* Confetti component */}
        {isConfettiVisible && <Confetti width={window.innerWidth} height={window.innerHeight} />}

        {/* Balloon animation */}
        {isConfettiVisible && (
          <animated.div style={{ ...balloonAnimation, position: "absolute", top: "100px", left: "50%" }}>
          </animated.div>
        )}
      </div>
    </>
  )
}

CodeGivawey.propTypes = {
  isConfettiVisible: PropTypes.bool.isRequired,
  balloonAnimation: PropTypes.object.isRequired
}

