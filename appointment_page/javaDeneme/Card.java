public class Card {
    private double balance;
    private int age;
    private String education;
    private String cardNumber;
    public Card(int balance,int age,String education,String cardNumber){
        this.balance = balance;
        this.age = age;
        this.education = education;
        this.cardNumber = cardNumber;
    }
    public double getBalance(){
        return balance;
    }
    public void setBalance(double balance){
        if(this.balance<0){
            System.out.println("Bakiye 0'dan kucuk olamaz");
        }else{
            this.balance = balance;
        }
    }

    public int getAge(){
        return age;
    }
    public void setAge(int age){
        if(this.age<=0){
            System.out.println("Yaş 0'dan kucuk olamaz");
        }else{
            this.age = age;
        }
    }

    public String getEducatşon(){
        return education;
    }
    public void setEducation(String education){
        this.education = education;
    }

    public String getCardNumber(){
        return cardNumber;
    }
    public void setCardNumber(String cardNumber){
        this.cardNumber = cardNumber;
    }

    public void loadMoney(double amount){
        if(amount>0){
            balance += amount;
        }else{
            System.out.println("Miktar 0'dan kucuk olamaz");
        }
    }

    public boolean  spendMoney(double amount){
        if(amount>0 && amount<=balance){
            return true;
        }else{
            System.out.println("Miktar 0'dan kucuk veya bakiye yetersiz");
            return false;
        }
    }
}
