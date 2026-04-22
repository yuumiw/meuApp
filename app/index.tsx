import { Ionicons } from '@expo/vector-icons'; // ou react-native-vector-icons
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  details: {
    marca?: string;
    tipo?: string;
    vantagens?: string;
    aroma?: string;
    forma?: string;
    peso?: string;
    ingredientes?: string;
  };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'wishlist' | 'profile'>('wishlist');
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const initialProducts: Product[] = [
    {
      id: 1,
      name: 'PDRN PINK PEPTIDE SERUM 30ml',
      price: 'R$ 155,27',
      image: 'https://images.unsplash.com/photo-1686121522744-dc323ce3fb26?w=600',
      details: {
        tipo: 'Todos os tipos de pele',
        vantagens: 'Correção de mancha escura',
        aroma: 'Sem aroma',
        marca: 'medicube',
        forma: 'Gota',
      },
    },
    {
      id: 2,
      name: 'CENTELLA AMPOULE 55ML',
      price: 'R$ 179,90',
      image: 'https://images.unsplash.com/photo-1681487785847-c76e0dfd90e0?w=600',
      details: {
        vantagens: 'Este sérum é perfeito para acalmar peles irritadas',
        aroma: 'Sem aroma',
        marca: 'SKIN1004',
        forma: 'Gota',
        peso: '55 Gramas',
      },
    },
    {
      id: 3,
      name: 'Toner Pads Medicube Zero Pore Pad C/70 un',
      price: 'R$ 253,00',
      image: 'https://images.unsplash.com/photo-1676839574523-54ad8dbaf5b7?w=600',
      details: {
        marca: 'medicube',
        forma: 'Pad',
        tipo: 'Mista, Normal, Oleosa, Pele propensa a acne',
        vantagens: 'Reduz a aparência dos poros dilatados e melhora a textura da pele',
        ingredientes: 'Ácido lático, Ácido salicílico',
      },
    },
    {
      id: 4,
      name: 'Caudalie Vinopure Sérum Ácido Salicílico',
      price: 'R$ 236,55',
      image: 'https://images.unsplash.com/photo-1686121522357-48dc9ea59281?w=600',
      details: {
        tipo: 'Todos os tipos de pele',
        vantagens: '86% notaram a acne reduzida após 7 dias',
        ingredientes: 'Gluconolactona (PHA), Niacinamida, Ácido Salicílico',
        marca: 'Caudalie',
      },
    },
    {
      id: 5,
      name: 'Caudalie Água de Beleza - 100 mL',
      price: 'R$ 284,05',
      image: 'https://m.media-amazon.com/images/I/61gKkGrzgRL._AC_SL1500_.jpg',
      details: {
        marca: 'Caudalie',
      },
    },
    {
      id: 6,
      name: 'Vinoclean Loção Tônica Hidratante',
      price: 'R$ 132,05',
      image: 'https://images.unsplash.com/photo-1766714613562-f59602e35203?w=600',
      details: {
        marca: 'Caudalie',
      },
    },
  ];

  const [wishlist, setWishlist] = useState<Product[]>(initialProducts);

  // Form states para adicionar produto
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImage, setNewProductImage] = useState('');
  const [newProductMarca, setNewProductMarca] = useState('');
  const [newProductTipo, setNewProductTipo] = useState('');
  const [newProductVantagens, setNewProductVantagens] = useState('');
  

  // Profile states - 4 Text Inputs
  const [profileName, setProfileName] = useState('Maria Silva');
  const [profileEmail, setProfileEmail] = useState('maria@email.com');
  const [profilePhone, setProfilePhone] = useState('(11) 98765-4321');
  const [profileAddress, setProfileAddress] = useState('São Paulo, SP');

  // 2 Pickers (Simulados com estado)
  const [skinType, setSkinType] = useState('mista');
  const [mainConcern, setMainConcern] = useState('manchas');

  // 2 Sliders
  const [budget, setBudget] = useState(250);
  const [age, setAge] = useState(28);

  // 2 Switches
  const [sensitiveSkin, setSensitiveSkin] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  const handleAddProduct = () => {
    if (!newProductName || !newProductPrice) {
      Alert.alert('Erro', 'Preencha pelo menos o nome e preço do produto!');
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: newProductName,
      price: newProductPrice,
      image: newProductImage || 'https://images.unsplash.com/photo-1686121522744-dc323ce3fb26?w=400',
      details: {
        marca: newProductMarca,
        tipo: newProductTipo,
        vantagens: newProductVantagens,
      },
    };

    setWishlist([...wishlist, newProduct]);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductImage('');
    setNewProductMarca('');
    setNewProductTipo('');
    setNewProductVantagens('');
    setShowAddProduct(false);
  };

  const handleDeleteProduct = (id: number) => {
    setWishlist(wishlist.filter((p) => p.id !== id));
  };

  const handleSaveProfile = () => {
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
  };

  const handleResetProfile = () => {
    setProfileName('');
    setProfileEmail('');
    setProfilePhone('');
    setProfileAddress('');
    setSkinType('');
    setMainConcern('');
    setBudget(150);
    setAge(25);
    setSensitiveSkin(false);
    setNewsletter(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {currentPage === 'wishlist' ? 'Minha Wishlist' : 'Perfil'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {currentPage === 'wishlist' ? 'Produtos que você deseja' : 'Configure suas preferências'}
          </Text>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* WISHLIST PAGE */}
          {currentPage === 'wishlist' && (
            <View style={styles.wishlistContainer}>
              {wishlist.map((product) => (
                <View key={product.id} style={styles.productCard}>
                  <Image source={{ uri: product.image }} style={styles.productImage} />

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteProduct(product.id)}
                  >
                    <Ionicons name="close" size={20} color="#b85570" />
                  </TouchableOpacity>

                  <View style={styles.priceTag}>
                    <Text style={styles.priceText}>{product.price}</Text>
                  </View>

                  <View style={styles.productInfo}>
                    <View style={styles.productHeader}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          setExpandedProduct(expandedProduct === product.id ? null : product.id)
                        }
                      >
                        <Ionicons
                          name={expandedProduct === product.id ? 'chevron-up' : 'chevron-down'}
                          size={20}
                          color="#b85570"
                        />
                      </TouchableOpacity>
                    </View>

                    {expandedProduct === product.id && (
                      <View style={styles.productDetails}>
                        {Object.entries(product.details).map(([key, value]) =>
                          value ? (
                            <View key={key} style={styles.detailRow}>
                              <Text style={styles.detailKey}>{key}: </Text>
                              <Text style={styles.detailValue}>{value}</Text>
                            </View>
                          ) : null
                        )}
                      </View>
                    )}
                  </View>
                </View>
              ))}

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddProduct(true)}
              >
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.addButtonText}>Adicionar Produto</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* PROFILE PAGE */}
          {currentPage === 'profile' && (
            <View style={styles.profileContainer}>
              {/* Avatar */}
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{profileName.charAt(0)}</Text>
                </View>
                <Text style={styles.profileNameDisplay}>{profileName}</Text>
              </View>

              {/* Informações Pessoais */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações Pessoais</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nome Completo</Text>
                  <TextInput
                    style={styles.input}
                    value={profileName}
                    onChangeText={setProfileName}
                    placeholder="Digite seu nome"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>E-mail</Text>
                  <TextInput
                    style={styles.input}
                    value={profileEmail}
                    onChangeText={setProfileEmail}
                    placeholder="seu@email.com"
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Telefone</Text>
                  <TextInput
                    style={styles.input}
                    value={profilePhone}
                    onChangeText={setProfilePhone}
                    placeholder="(00) 00000-0000"
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Endereço</Text>
                  <TextInput
                    style={styles.input}
                    value={profileAddress}
                    onChangeText={setProfileAddress}
                    placeholder="Cidade, Estado"
                  />
                </View>
              </View>

              {/* Preferências de Skincare */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preferências de Skincare</Text>

                {/* Picker 1 - Tipo de Pele */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Tipo de Pele</Text>
                  <View style={styles.pickerContainer}>
                    {['Normal', 'Seca', 'Oleosa', 'Mista', 'Sensível'].map((tipo) => (
                      <TouchableOpacity
                        key={tipo}
                        style={[
                          styles.pickerOption,
                          skinType === tipo.toLowerCase() && styles.pickerOptionSelected,
                        ]}
                        onPress={() => setSkinType(tipo.toLowerCase())}
                      >
                        <Text
                          style={[
                            styles.pickerOptionText,
                            skinType === tipo.toLowerCase() && styles.pickerOptionTextSelected,
                          ]}
                        >
                          {tipo}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Picker 2 - Preocupação */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Preocupação Principal</Text>
                  <View style={styles.pickerContainer}>
                    {['Acne', 'Manchas', 'Rugas', 'Poros', 'Hidratação'].map((concern) => (
                      <TouchableOpacity
                        key={concern}
                        style={[
                          styles.pickerOption,
                          mainConcern === concern.toLowerCase() && styles.pickerOptionSelected,
                        ]}
                        onPress={() => setMainConcern(concern.toLowerCase())}
                      >
                        <Text
                          style={[
                            styles.pickerOptionText,
                            mainConcern === concern.toLowerCase() && styles.pickerOptionTextSelected,
                          ]}
                        >
                          {concern}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Slider 1 - Orçamento */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Orçamento Mensal: R$ {budget}</Text>
                  <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={50}
                    maximumValue={500}
                    step={10}
                    value={budget}
                    onValueChange={setBudget}
                />
                </View>

                {/* Slider 2 - Idade */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Idade: {age} anos</Text>
                  <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={16}
                    maximumValue={80}
                    step={1}
                    value={age}
                    onValueChange={setAge}
                />
                </View>

                {/* Switch 1 - Pele Sensível */}
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>Pele Sensível?</Text>
                  <TouchableOpacity
                    style={[styles.switch, sensitiveSkin && styles.switchActive]}
                    onPress={() => setSensitiveSkin(!sensitiveSkin)}
                  >
                    <View
                      style={[
                        styles.switchThumb,
                        sensitiveSkin && styles.switchThumbActive,
                      ]}
                    />
                  </TouchableOpacity>
                </View>

                {/* Switch 2 - Newsletter */}
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>Receber Newsletter?</Text>
                  <TouchableOpacity
                    style={[styles.switch, newsletter && styles.switchActive]}
                    onPress={() => setNewsletter(!newsletter)}
                  >
                    <View
                      style={[styles.switchThumb, newsletter && styles.switchThumbActive]}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Botões */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.resetButton} onPress={handleResetProfile}>
                  <Text style={styles.resetButtonText}>Limpar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                  <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage('wishlist')}
          >
            <Ionicons
              name={currentPage === 'wishlist' ? 'heart' : 'heart-outline'}
              size={24}
              color={currentPage === 'wishlist' ? '#b85570' : '#ac8d96'}
            />
            <Text
              style={[
                styles.navButtonText,
                currentPage === 'wishlist' && styles.navButtonTextActive,
              ]}
            >
              Wishlist
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage('profile')}
          >
            <Ionicons
              name={currentPage === 'profile' ? 'person' : 'person-outline'}
              size={24}
              color={currentPage === 'profile' ? '#b85570' : '#ac8d96'}
            />
            <Text
              style={[
                styles.navButtonText,
                currentPage === 'profile' && styles.navButtonTextActive,
              ]}
            >
              Perfil
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal Adicionar Produto */}
      <Modal visible={showAddProduct} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adicionar Produto</Text>
              <TouchableOpacity onPress={() => setShowAddProduct(false)}>
                <Ionicons name="close" size={28} color="#b85570" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome do Produto *</Text>
                <TextInput
                  style={styles.input}
                  value={newProductName}
                  onChangeText={setNewProductName}
                  placeholder="Ex: Vitamin C Serum"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Preço *</Text>
                <TextInput
                  style={styles.input}
                  value={newProductPrice}
                  onChangeText={setNewProductPrice}
                  placeholder="Ex: R$ 150,00"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>URL da Imagem</Text>
                <TextInput
                  style={styles.input}
                  value={newProductImage}
                  onChangeText={setNewProductImage}
                  placeholder="https://..."
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Marca</Text>
                <TextInput
                  style={styles.input}
                  value={newProductMarca}
                  onChangeText={setNewProductMarca}
                  placeholder="Ex: The Ordinary"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tipo de Pele</Text>
                <TextInput
                  style={styles.input}
                  value={newProductTipo}
                  onChangeText={setNewProductTipo}
                  placeholder="Ex: Todos os tipos de pele"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Vantagens</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={newProductVantagens}
                  onChangeText={setNewProductVantagens}
                  placeholder="Descreva os benefícios..."
                  multiline
                  numberOfLines={4}
                />
              </View>

              <TouchableOpacity style={styles.modalAddButton} onPress={handleAddProduct}>
                <Text style={styles.modalAddButtonText}>Adicionar à Wishlist</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf8f6',
  },
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '300',
    color: '#b85570',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6e4d57',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Wishlist
  wishlistContainer: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    backgroundColor: 'white',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  priceTag: {
    position: 'absolute',
    bottom: 160,
    right: 12,
    backgroundColor: '#b85570',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  productInfo: {
    padding: 16,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22141a',
    flex: 1,
    marginRight: 8,
  },
  productDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(184, 85, 112, 0.2)',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailKey: {
    fontWeight: '600',
    color: '#b85570',
    textTransform: 'capitalize',
  },
  detailValue: {
    color: '#6e4d57',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#b85570',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  // Profile
  profileContainer: {
    paddingBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#b85570',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
  },
  profileNameDisplay: {
    fontSize: 20,
    fontWeight: '600',
    color: '#22141a',
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#b85570',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6e4d57',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'rgba(184, 85, 112, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#22141a',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f7eeed',
    borderWidth: 1,
    borderColor: 'rgba(184, 85, 112, 0.2)',
  },
  pickerOptionSelected: {
    backgroundColor: '#b85570',
    borderColor: '#b85570',
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#6e4d57',
  },
  pickerOptionTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  sliderNote: {
    fontSize: 11,
    color: '#ac8d96',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  sliderButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: 'rgba(184, 85, 112, 0.2)',
  },
  sliderButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f7eeed',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22141a',
  },
  switch: {
    width: 56,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e5d4d7',
    padding: 2,
  },
  switchActive: {
    backgroundColor: '#b85570',
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  switchThumbActive: {
    transform: [{ translateX: 28 }],
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 16,
  },
  resetButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 2,
    borderColor: '#b85570',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#b85570',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#b85570',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Bottom Nav
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 2,
    borderTopColor: 'rgba(184, 85, 112, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 48,
    justifyContent: 'space-around',
  },
  navButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  navButtonText: {
    fontSize: 12,
    color: '#ac8d96',
    marginTop: 4,
    fontWeight: '600',
  },
  navButtonTextActive: {
    color: '#b85570',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fdf8f6',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#b85570',
  },
  modalAddButton: {
    backgroundColor: '#b85570',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  modalAddButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});