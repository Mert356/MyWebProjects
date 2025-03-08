public class Apple {


}

class Fruit extends Apple{
  public Fruit(String name) {
    System.out.println("Fruit's constructor is invoked");
  }
}


// In class today, we discussed three ways to remove the compiler error.
// The first 10 students to contact me with descriptions of those three ways and suggest 
// a fourth way to remove the compiler error that is substantiallydifferent from  the other
// three ways will receive a bonus 10 points on their homework total for the semester.

// The compiler error is caused by the following details:
// 1. The child (Apple) inherits from the parent (Fruit)
// 2. The parent class constructor takes an argument
// 3. The default no-arg constructor of the parent is replaced with the single argument constructor
// 4. The child class (by default) calls a no-arg constructor of the parent (super())
// 
// The ways to remove the compiler error discussed in class were as follows:
// 1. Add a no-arg constructor to the parent (addresses issue 2 above).
// 2. Explicitely add a constructor to the child that calls the existing parent constructor (addresses issue 4 above).
// 3. Remove the existing constructor of the parent class (addresses issue 3 above).
// 
// I am looking for a way to remove the compiler error that is not similar to the three listed here.