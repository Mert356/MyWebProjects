public class Passenger {
    private String name;
    private String lastName;
    private int age;
    private String education;
    private Card card;
    public Passenger(String name,String lastName,int age,String education,Card card){
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.education = education;
        this.card = card;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }

    public String getLastName(){
        return lastName;
    }
    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    public int getAge(){
        return age;
    }
    public void setAge(int age){
        if(age<=0){
            System.out.println("Yaş 0'dan kucuk olamaz");
        }else{
            this.age = age;
        }
    }
    public Card getCard(){
        return card;
    }
    public void setCard(Card card){
        this.card = card;
    }

    public String getEducation(){
        return education;
    }
    public void setEducation(String education){
        this.education = education;
    }
}
