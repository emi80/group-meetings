#!/usr/bin/env nextflow

str = Channel.from('hello', 'hola', 'bonjour', 'ciao')

process printHello {

   input:
   val str 

   output: 
   stdout into result

   """
   echo $str
   """
}   


result.subscribe { print it }
