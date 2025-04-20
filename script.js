document.addEventListener('alpine:init', () => {
   Alpine.data('community', () => ({
     komunitas: [
       {
         title: 'Diskusi Langsung', 
         body: 'Bertemu dan diskusi langsung, berbagi ilmu seputar dunia pemrograman ataupun diluar daripada itu.', 
         img: 'img/user.svg'
       },
       {
         title: 'Instagram', 
         body: 'Ikuti kami di instagram untuk mendapatkan tips-tips pemrograman dan seputar informasi tentang Habibie Coding Club.', 
         img: 'img/instagram.svg'
       },
       {
         title: 'Discord', 
         body: 'Diskusi dimanapun anda berada dengan menggunakan discord', 
         img: 'img/dc.svg'
       }
     ],
     features: [
       {
         title: 'Materi Terstruktur', 
         body: 'Materi sudah disusun rapi sesuai roadmap industri, dapat diakses oleh semua member Habibie Coding Club melalui discord', 
         img: 'img/buku.svg'
       },
       {
         title: 'Belajar Interaktif', 
         body: 'Ikuti kelas interaktif yang membahas dasar hingga tingkat lanjut pemrograman, disertai dengan latihan langsung dan kuis.', 
         img: 'img/study.svg'
       },
       {
         title: 'Achievement', 
         body: 'Dapatkan role "Bisa Ngoding" setelah menyelesaikan modul, dan berkesempatan untuk menjadi pengurus HCC.', 
         img: 'img/award.svg'
       }
     ],

     questions: [],
     choices: [],
     selected: null,
     answered: false,
     currrentQuestion: 0,
     score: 0,
     nama: 'test',

     async fetchQuestions() {
      try {
        // ambil data dari API lalu simpan ke property questions
        // sekali ambil langsung dapat 11 [0 -> 10] pertanyaan, ada question, correct_answer, incorrect_answers, category, difficulty, dll
        // liat di ujung url API ada angka yang menunjukkan nomor kategory, bisa diubah kalo mau
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=18');
        const data = await response.json();
        this.questions = data.results;
        // karna option terdiri dari 2 array yg berbeda yaitu array correct_answer dan incorrect_answers,,
        // maka kita gabungkan kedua array menjadi 1 karna nantinya jawabannya akan dilooping. Kita gabungkan dengan spread operator.
        let options = [...this.questions[this.currrentQuestion].incorrect_answers, this.questions[this.currrentQuestion].correct_answer]
        // karna array digabung dengan spread operator, otomatis posisi jawaban benar akan selalu di tempat yang sama
        // oleh karna itu kita acak posisinya dengan Math.random(). 
        this.choices = options.sort(() => Math.random() - 0.5)
        this.loaded = true;
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    },
    next() {
      // fungsi untuk lanjut ke pertanyaan berikutnya
      if (this.currrentQuestion + 1 < this.questions.length + 1) {
        this.currrentQuestion++;
        let options = [...this.questions[this.currrentQuestion].incorrect_answers, this.questions[this.currrentQuestion].correct_answer];
        this.choices = options.sort(() => Math.random() - 0.5);
        this.selected = null;
        this.answered = false;
      } else {
        return false
      }
    },

    updateScore(selected) {
      if(selected === this.questions[this.currrentQuestion].correct_answer) {
        this.score++
      }
    },

    // anu ji ini feedback kata kata berdasarkan skor yang mudapat
    getResultTitle() {
      if (this.score <= 2) return "🔰 Pemula Banget";
      if (this.score <= 4) return "🐣 Cukup Paham!";
      if (this.score <= 6) return "⚙️ Lumayan Juga!";
      if (this.score <= 8) return "💻 Sepuhh";
      if (this.score === 9) return "🧠 Hacker Muda";
      return "🏆 Legendary Coder";
    }
   }));
 });